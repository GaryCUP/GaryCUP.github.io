document.addEventListener('DOMContentLoaded', function() {
    const tagDropdown = document.getElementById('tagDropdown');
    const selectedTagsList = document.getElementById('selectedTagsList');
    const tagsInput = [];
    let tagsData = { moods: [], activities: [] };

    document.getElementById('file').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const csvData = parseCSV(e.target.result);
                extractTags(csvData);
                populateTagDropdown();
            };
            reader.readAsText(file);
        }
    });

    document.querySelector('.add-tag-btn').addEventListener('click', function() {
        const selectedTag = tagDropdown.value;
        if (selectedTag && !tagsInput.includes(selectedTag)) {
            tagsInput.push(selectedTag);
            updateSelectedTagsList();
        }
    });

    function updateSelectedTagsList() {
        selectedTagsList.innerHTML = '';
        tagsInput.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = () => {
                tagsInput.splice(tagsInput.indexOf(tag), 1);
                updateSelectedTagsList();
            };
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
            const csvData = parseCSV(e.target.result);

            // Filter and process data
            const filteredDreams = filterDreams(csvData, option, year, startDate, endDate);
            const tagStats = calculateTagStats(filteredDreams, tagsInput);

            // Display results
            displayResults(tagStats, filteredDreams, tagsInput);
        };

        reader.readAsText(file);
    });

    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
                return obj;
            }, {});
        });
    }

    function extractTags(data) {
        tagsData = { moods: new Set(), activities: new Set() };
        data.forEach(entry => {
            tagsData.moods.add(entry.mood);
            entry.activities.split('|').forEach(activity => {
               // tagsData.activities.add(activity.trim().replace(/^"|"$/, ''));
             tagsData.activities.add(activity.replace(/"/g, "").trim());

            });
        });
        tagsData.moods = Array.from(tagsData.moods);
        tagsData.activities = Array.from(tagsData.activities);
    }

    function populateTagDropdown() {
        tagDropdown.innerHTML = '';
        const moodGroup = document.createElement('optgroup');
        moodGroup.label = 'Moods';
        tagsData.moods.forEach(mood => {
            const option = document.createElement('option');
            option.value = mood;
            option.textContent = mood;
            moodGroup.appendChild(option);
        });
        tagDropdown.appendChild(moodGroup);

        const activityGroup = document.createElement('optgroup');
        activityGroup.label = 'Activities';
        tagsData.activities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity;
            option.textContent = activity;
            activityGroup.appendChild(option);
        });
        tagDropdown.appendChild(activityGroup);
    }


    function filterDreams(dreams, option, year, startDate, endDate) {
        const now = new Date();
        return dreams.filter(dream => {
            const dreamDate = new Date(dream.full_date + ' ' + dream.time);

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
    function normalizeTag(tag) {
        //return tag.trim().replace(/^"(.*)"$/, '$1');        
        return tag.replace(/"/g, "").trim();

    }

    function calculateTagStats(dreams, selectedTags) {
        const tagCounts = { moods: {}, activities: {} };
        const coOccurrence = { moods: {}, activities: {} };

        dreams.forEach(dream => {
            const mood = dream.mood;
            const activities = dream.activities.split('|').map(a => a.replace(/"/g, "").trim())

            if (!selectedTags.length || selectedTags.includes(mood)) {
                if (!tagCounts.moods[mood]) tagCounts.moods[mood] = 0;
                tagCounts.moods[mood]++;

                activities.forEach(activity => {
                    if (!coOccurrence.moods[mood]) coOccurrence.moods[mood] = {};
                    if (!coOccurrence.moods[mood][activity]) coOccurrence.moods[mood][activity] = 0;
                    coOccurrence.moods[mood][activity]++;
                });
            }

            activities.forEach(activity => {
                if (!selectedTags.length || selectedTags.includes(activity)) {
                    if (!tagCounts.activities[activity]) tagCounts.activities[activity] = 0;
                    tagCounts.activities[activity]++;

                    if (!coOccurrence.activities[activity]) coOccurrence.activities[activity] = {};
                    if (!coOccurrence.activities[activity][mood]) coOccurrence.activities[activity][mood] = 0;
                    coOccurrence.activities[activity][mood]++;

                    activities.forEach(coActivity => {
                        if (coActivity !== activity) {
                            if (!coOccurrence.activities[activity][coActivity]) coOccurrence.activities[activity][coActivity] = 0;
                            coOccurrence.activities[activity][coActivity]++;
                        }
                    });
                }
            });
        });

        return { tagCounts, coOccurrence };
    }

    let chartInstance = null;
    let stackedBarChartInstance=null;

    function createTimeSeriesChart(dreams, selectedTags) {
        const ctx = document.getElementById('timeSeriesChart').getContext('2d');

        if (chartInstance) {
            chartInstance.destroy();
        }

        const tagData = {};
        selectedTags.forEach(tag => {
            tagData[tag] = {};
        });

        dreams.sort((a, b) => new Date(a.full_date + ' ' + a.time) - new Date(b.full_date + ' ' + b.time));
        const cumulativeCounts = {};
        selectedTags.forEach(tag => {
            cumulativeCounts[tag] = 0;
        });
       
        

        dreams.forEach(dream => {
            const dreamDateTime = new Date(dream.full_date + ' ' + dream.time).toISOString();
            const taggs = [...dream.activities.split('|').map(a => a.trim())];
            selectedTags.forEach(tag => {
                if(taggs.some(t => (t.toLowerCase().trim()) === (tag.toLowerCase())))
                    {
                      
                    cumulativeCounts[tag]++;
                }
                if (!tagData[tag][dreamDateTime] && cumulativeCounts[tag] > 0) {
                    tagData[tag][dreamDateTime] = cumulativeCounts[tag];
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
                pointRadius: 2,
                pointHoverRadius: 4
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
                            text: 'Date and Time'
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
                                    arrows: 'both',
                                    color: { opacity: 0.25 }  // Make edges slightly transparent
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
            interaction: {
                hover: true,  // Enable hover interaction
                navigationButtons: true,  // Add navigation buttons
                keyboard: true  // Allow keyboard navigation
            },
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
    
       const network= new vis.Network(container, data, options);
          // Highlight edges on hover
    network.on("hoverNode", function (params) {
        const connectedEdges = network.getConnectedEdges(params.node);
        edges.update(connectedEdges.map(edgeId => ({ id: edgeId, color: { opacity: 1 } })));
    });

    network.on("blurNode", function (params) {
        edges.update(edges.map(edge => ({ id: edge.id, color: { opacity: 0.25 } })));
    });

    // Focus on node when clicked
    network.on("click", function (params) {
        if (params.nodes.length) {
            const nodeId = params.nodes[0];
            network.focus(nodeId, {
                scale: 1.5,
                animation: {
                    duration: 500,
                    easingFunction: 'easeInOutQuad'
                }
            });
        }
    });
         
    }
    

  function createStackedBarChart(dreams,selectedTags) {
        const ctx = document.getElementById('stackedBarChart').getContext('2d');

        if (stackedBarChartInstance) {
            stackedBarChartInstance.destroy();
        }

        const monthlyData = {};
        const allTags = new Set();
        const tagData = {};
        selectedTags.forEach(tag => {
            tagData[tag] = {};
        });

        dreams.forEach(dream => {
            const month = dream.full_date.substring(0, 7); // YYYY-MM
            const tags = [...dream.activities.split('|').map(a => a.trim()), dream.mood];

            if (!monthlyData[month]) {
                monthlyData[month] = {};
            }

            selectedTags.forEach(tag => {
                if(tags.some(t => (t.toLowerCase().trim()) === (tag.toLowerCase())))
                {
                    
                    allTags.add(tag);
                if (!monthlyData[month][tag]) {
                    monthlyData[month][tag] = 0;
                }
                monthlyData[month][tag]++;

                }
               // monthlyData[month][tag]++;
                
            });
        });

        const labels = Object.keys(monthlyData).sort();



         //working//
        const datasets = Array.from(allTags).map(tag => ({
            label: tag,
            data: labels.map(month => monthlyData[month][tag] || 0),
            backgroundColor: getRandomColor()
        }));




        stackedBarChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Month'
                        },
                        grid:{
                            offset:true
                        },
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    }
                },
             
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    
                    },
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Activities and Moods by Month'
                    },
                    datalabels: {
                        formatter: (value) => {
                          return value > 0 ? value : '';
                        }
                      }
                },
                responsive: true
            }
        });
    }


    function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    function displayResults({ tagCounts, coOccurrence }, dreams, selectedTags) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<h2>Statistics</h2>';

        // Display mood counts
        resultDiv.innerHTML += '<h3>Moods</h3><ul>';
        for (const [mood, count] of Object.entries(tagCounts.moods)) {
            resultDiv.innerHTML += `<li>${mood}: ${count}</li>`;
        }
        resultDiv.innerHTML += '</ul>';

        // Display activity counts
        resultDiv.innerHTML += '<h3>Activities</h3><ul>';
        for (const [activity, count] of Object.entries(tagCounts.activities)) {
            resultDiv.innerHTML += `<li>${activity}: ${count}</li>`;
        }
        resultDiv.innerHTML += '</ul>';

        resultDiv.classList.remove('hidden');

        // Create time series chart
        createTimeSeriesChart(dreams, selectedTags);
    
        // Create stacked bar chart
        createStackedBarChart(dreams, selectedTags);
    
        // Create network graph
        createNetworkGraph(coOccurrence);
		
    }
});