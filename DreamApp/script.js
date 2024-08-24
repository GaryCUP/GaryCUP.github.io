document.addEventListener('DOMContentLoaded', function() {
    const tagDropdown = document.getElementById('tagDropdown');
    const selectedTagsList = document.getElementById('selectedTagsList');
    const tagsInput = [];
    let tagsData = {};

    document.getElementById('file').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = JSON.parse(e.target.result);
                tagsData = extractTags(data);  // Extract tags from the JSON file
                populateTagDropdown(tagsData);  // Populate the dropdown
            };
            reader.readAsText(file);
        }
    });

    document.querySelector('.add-tag-btn').addEventListener('click', function() {
        const selectedTag = tagDropdown.value;
        if (selectedTag && !tagsInput.includes(selectedTag)) {
            tagsInput.push(selectedTag);
            const li = document.createElement('li');
            li.textContent = selectedTag;
            selectedTagsList.appendChild(li);
        }
    });
    
    function updateSelectedTagsList() {
        selectedTagsList.innerHTML = '';
        tagsInput.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.addEventListener('click', () => {
                tagsInput.delete(tag);
                updateSelectedTagsList();
            });
            li.appendChild(removeBtn);
            selectedTagsList.appendChild(li);
        });
    }

    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const fileInput = document.getElementById('file');
        const option = document.querySelector('input[name="option"]:checked')?.value;
        const year = document.getElementById('yearInput').value;
        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;

        if (!fileInput.files.length) {
            alert('Please select a file.');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);

            // Filter and process data
            const filteredDreams = filterDreams(data, option, year, startDate, endDate);
            const tagStats = calculateTagStats(filteredDreams, tagsInput);

            // Display results
            displayResults(tagStats, filteredDreams, tagsInput);
        };

        reader.readAsText(file);
    });

    function extractTags(data) {
        const tags = {};
        data.forEach(dream => {
            dream.tags.forEach(tag => {
                const tagType = tag.type;
                const tagName = tag.name;

                if (!tags[tagType]) {
                    tags[tagType] = [];
                }

                if (!tags[tagType].includes(tagName)) {
                    tags[tagType].push(tagName);
                }
            });
        });

        return tags;
    }

    function populateTagDropdown(tagsData) {
        tagDropdown.innerHTML = '';  // Clear previous options
        for (const [type, tags] of Object.entries(tagsData)) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = type;

            tags.forEach(tag => {
                const option = document.createElement('option');
                option.value = tag;
                option.textContent = tag;
                optgroup.appendChild(option);
            });

            tagDropdown.appendChild(optgroup);
        }
    }

    function filterDreams(dreams, option, year, startDate, endDate) {
        const now = new Date();
        return dreams.filter(dream => {
            const dreamDate = new Date(dream.date);

            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                return dreamDate >= start && dreamDate <= end;
            }

            if (option) {
                const daysMap = {
                    'last 30 days': 30,
                    'last 60 days': 60,
                    'last 90 days': 90
                };
                const days = daysMap[option];
                if (days) {
                    return (now - dreamDate) / (1000 * 60 * 60 * 24) <= days;
                } else if (option === 'year' && year) {
                    return dreamDate.getFullYear() == year;
                }
            }

            return true;
        });
    }

    function calculateTagStats(dreams, selectedTags) {
        const tagCounts = {};
        const coOccurrence = {};
    
        dreams.forEach(dream => {
            dream.tags.forEach(tag => {
                const tagName = tag.name;
                const tagType = tag.type;
    
                if (!selectedTags.length || selectedTags.includes(tagName)) {
                    if (!tagCounts[tagType]) {
                        tagCounts[tagType] = {};
                    }
                    if (!tagCounts[tagType][tagName]) {
                        tagCounts[tagType][tagName] = 0;
                    }
                    tagCounts[tagType][tagName]++;
    
                    dream.tags.forEach(coTag => {
                        if (coTag.name !== tagName) {
                            const coTagName = coTag.name;
                            const coTagType = coTag.type;
    
                            if (!coOccurrence[tagType]) {
                                coOccurrence[tagType] = {};
                            }
                            if (!coOccurrence[tagType][tagName]) {
                                coOccurrence[tagType][tagName] = {};
                            }
                            if (!coOccurrence[tagType][tagName][coTagType]) {
                                coOccurrence[tagType][tagName][coTagType] = {};
                            }
                            if (!coOccurrence[tagType][tagName][coTagType][coTagName]) {
                                coOccurrence[tagType][tagName][coTagType][coTagName] = 0;
                            }
                            coOccurrence[tagType][tagName][coTagType][coTagName]++;
                        }
                    });
                }
            });
        });
    
        return { tagCounts, coOccurrence };
    }
    let chartInstance = null;

   function createTimeSeriesChart(dreams, selectedTags) {
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }
    
    const tagData = {};
    selectedTags.forEach(tag => {
        tagData[tag] = {};
    });

    dreams.sort((a, b) => new Date(a.date) - new Date(b.date));
    const cumulativeCounts = {};
    selectedTags.forEach(tag => {
        cumulativeCounts[tag] = 0;
    });

    dreams.forEach(dream => {
        const dreamDate = new Date(dream.date).toISOString().split('T')[0];
        selectedTags.forEach(tag => {
            if (dream.tags.some(t => t.name === tag)) {
                cumulativeCounts[tag]++;
            }
            if (!tagData[tag][dreamDate] && cumulativeCounts[tag] > 0) {
                tagData[tag][dreamDate] = cumulativeCounts[tag];
            }
        });
    });

    const datasets = selectedTags.map(tag => {
        const dataPoints = [];
        for (const [date, count] of Object.entries(tagData[tag])) {
            dataPoints.push({ x: date, y: count });
        }
        return {
            label: tag,
            data: dataPoints,
            fill: false,
            borderColor: getRandomColor(),
            tension: 0.1,
            pointRadius: 2,  // Smaller point size
            pointHoverRadius: 4 // Hover size
        };
    });

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cumulative Count'
                    }
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const label = tooltipItem.dataset.label || '';
                            const value = tooltipItem.parsed.y;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}

    
    function createNetworkGraph(coOccurrence) {
        const container = document.getElementById('networkGraph');
        const nodes = new vis.DataSet();
        const edges = new vis.DataSet();
    
        // Create nodes and edges from co-occurrence data
        for (const [type, tags] of Object.entries(coOccurrence)) {
            for (const [tagName, coTags] of Object.entries(tags)) {
                const fromId = `${type}-${tagName}`;  // Ensure unique ID
                nodes.add({ id: fromId, label: tagName, group: type });
    
                for (const [coTagType, coTagsMap] of Object.entries(coTags)) {
                    for (const [coTagName, count] of Object.entries(coTagsMap)) {
                        const toId = `${coTagType}-${coTagName}`;  // Ensure unique ID
    
                        // Check if the reverse edge already exists
                        const reverseEdgeId = `${toId}-${fromId}`;
                        if (!edges.get(reverseEdgeId)) {
                            const edgeId = `${fromId}-${toId}`;
                            if (!edges.get(edgeId)) {
                                edges.add({
                                    id: edgeId,
                                    from: fromId,
                                    to: toId,
                                    label: count.toString(),
                                    font: { align: 'middle' },
                                    arrows: 'to'
                                });
                            }
                        }
                    }
                }
            }
        }
    
        const data = {
            nodes: nodes,
            edges: edges
        };
    
        const options = {
            autoResize: false,  // Dynamically resize the graph,
            nodes: {
                shape: 'circle',
                size: 10,
                font: {
                    size: 14,
                    face: 'Tahoma'
                }
            },
            edges: {
                width: 2,
                smooth: {
                    type: 'dynamic'
                }
            },
            physics: {
                enabled:true,
                stabilization: true,
                barnesHut: {
                    gravitationalConstant: -30000,
                    centralGravity: 0.4,
                   // springLength: 100,
                  //  springConstant: 0.06,
                    damping: 0.6,
                    avoidOverlap: .95
                }
            },
            layout:{
                improvedLayout: true,
                
                hierarchical: 
                {
                enabled: false,
                sortMethod: 'hubsize'
                }   
            }
			
			
        };
    
        new vis.Network(container, data, options);
         
    }
    
    function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    
    // Update displayResults to create the time series chart and network graph
    function displayResults({ tagCounts, coOccurrence }, dreams, selectedTags) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<h2>Statistics</h2>';
    
        // Display tag counts (you can keep this if needed)
        for (const [type, tags] of Object.entries(tagCounts)) {
            resultDiv.innerHTML += `<h3>${type}</h3><ul>`;
            for (const [name, count] of Object.entries(tags)) {
                resultDiv.innerHTML += `<li>${name}: ${count}</li>`;
            }
            resultDiv.innerHTML += '</ul>';
        }
    
        resultDiv.classList.remove('hidden');
    
        // Create time series chart
        createTimeSeriesChart(dreams, selectedTags);
    
        // Create network graph
        createNetworkGraph(coOccurrence);
    }
    
    

    
});
