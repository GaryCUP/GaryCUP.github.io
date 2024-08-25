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
                    updateSelectedTagsList();
                }
            });
            
            function updateSelectedTagsList() {
                selectedTagsList.innerHTML = '';
                tagsInput.forEach(tag => {
                    const li = document.createElement('li');
                    li.textContent = tag;
                    
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
                const tags = new Set();
                data.forEach(dream => {
                    dream.tags.forEach(tag => {
                        tags.add(tag);
                    });
                });
                return Array.from(tags);
            }
        
            function populateTagDropdown(tagsData) {
                tagDropdown.innerHTML = '';  // Clear previous options
                tagsData.forEach(tag => {
                    const option = document.createElement('option');
                    option.value = tag;
                    option.textContent = tag;
                    tagDropdown.appendChild(option);
                });
            }
        
            function filterDreams(dreams, option, year, startDate, endDate) {
                const now = new Date();
                return dreams.filter(dream => {
                    const dreamDate = new Date(dream.timestamp * 1000);  // Convert Unix timestamp to Date
        
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
                        if (!selectedTags.length || selectedTags.includes(tag)) {
                            if (!tagCounts[tag]) {
                                tagCounts[tag] = 0;
                            }
                            tagCounts[tag]++;
            
                            dream.tags.forEach(coTag => {
                                if (coTag !== tag) {
                                    if (!coOccurrence[tag]) {
                                        coOccurrence[tag] = {};
                                    }
                                    if (!coOccurrence[tag][coTag]) {
                                        coOccurrence[tag][coTag] = 0;
                                    }
                                    coOccurrence[tag][coTag]++;
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
        
                dreams.sort((a, b) => a.timestamp - b.timestamp);
                const cumulativeCounts = {};
                selectedTags.forEach(tag => {
                    cumulativeCounts[tag] = 0;
                });
        
                dreams.forEach(dream => {
                    const dreamDate = new Date(dream.timestamp * 1000).toISOString().split('T')[0];
                    selectedTags.forEach(tag => {
                        if (dream.tags.includes(tag)) {
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
            
                for (const [tag, coTags] of Object.entries(coOccurrence)) {
                    nodes.add({ id: tag, label: tag });
            
                    for (const [coTag, count] of Object.entries(coTags)) {
                        const edgeId = `${tag}-${coTag}`;
                        const reverseEdgeId = `${coTag}-${tag}`;
            
                        // Check if the reverse edge already exists
                        if (!edges.get(reverseEdgeId)) {
                            if (!edges.get(edgeId)) {
                                edges.add({
                                    id: edgeId,
                                    from: tag,
                                    to: coTag,
                                    label: count.toString(),
                                    font: { align: 'middle' },
                                    arrows: 'both',
                                    color: { opacity: 0.25 }  // Make edges slightly transparent

                                });
                            }
                        }
                    }
                }
            
                const data = {
                    nodes: nodes,
                    edges: edges
                };
            
                const options = {
                    autoResize: false,
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
                        enabled: true,
                        stabilization: true,
                        barnesHut: {
                            gravitationalConstant: -30000,
                            centralGravity: 0.4,
                            damping: 0.6,
                            avoidOverlap: .95
                        }
                    },
                    layout: {
                        improvedLayout: true,
                        hierarchical: {
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
            
          
            
            
            function getRandomColor() {
                return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            }
            
            function displayResults({ tagCounts, coOccurrence }, dreams, selectedTags) {
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '<h2>Statistics</h2>';
            
                // Display tag counts
                resultDiv.innerHTML += '<h3>Tag Counts</h3><ul>';
                for (const [tag, count] of Object.entries(tagCounts)) {
                    resultDiv.innerHTML += `<li>${tag}: ${count}</li>`;
                }
                resultDiv.innerHTML += '</ul>';
            
                resultDiv.classList.remove('hidden');
            
                // Create time series chart
                createTimeSeriesChart(dreams, selectedTags);
            
                // Create network graph
                createNetworkGraph(coOccurrence);
            }

        });
