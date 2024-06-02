// script.js

document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = JSON.parse(event.target.result);
        processDreams(data);
    };
    reader.readAsText(file);
}

function processDreams(data) {
    data.sort((a, b) => a.timestamp - b.timestamp);
    const tagCount = {};
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let timestampFormat = d3.timeFormat("%m-%d-%Y");

    let svg = d3.select("#chart").attr("width", "100%").attr("height", 600);
    const margin = {top: 20, right: 20, bottom: 30, left: 100};
    const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    svg = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("g").attr("class", "y-axis");
    svg.append("g").attr("class", "x-axis").attr("transform", `translate(0,${height})`);

    data.forEach((dream, index) => {
        setTimeout(() => {
            const tags = dream.tags;
            const timestamp = timestampFormat(new Date(dream.timestamp * 1000));
            tags.forEach(tag => {
                if (tagCount[tag]) {
                    tagCount[tag]++;
                } else {
                    tagCount[tag] = 1;
                }
            });

            updateChart(svg, tagCount, timestamp, colorScale, width, height, margin);
        }, index * 100); // Update every 250 milliseconds
    });
}

function updateChart(svg, tagCount, timestamp, colorScale, width, height, margin) {
    const topTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const x = d3.scaleLinear()
        .domain([0, d3.max(topTags, d => d[1])])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(topTags.map(d => d[0]))
        .range([0, height])
        .padding(0.1);

    svg.select(".y-axis")
        .transition()
        .duration(100)
        .call(d3.axisLeft(y));

    svg.select(".x-axis")
        .transition()
        .duration(100)
        .call(d3.axisBottom(x));

    const bars = svg.selectAll(".bar")
        .data(topTags, d => d[0]);

    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d[0]))
        .attr("height", y.bandwidth())
        .attr("width", 0)
        .attr("fill", d => colorScale(d[0]))
        .transition()
        .duration(100)
        .attr("width", d => x(d[1]));

    bars.transition()
        .duration(100)
        .attr("y", d => y(d[0]))
        .attr("width", d => x(d[1]))
        .attr("height", y.bandwidth());

    bars.exit()
        .transition()
        .duration(100)
        .attr("width", 0)
        .remove();

    d3.select("#timestamp").text(`Date: ${timestamp}`);
}
