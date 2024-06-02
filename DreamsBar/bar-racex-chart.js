let data = [];
let tagsCounter = {};
const width = 800;
const height = 500;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const barHeight = 20;
const duration = 500;
let chartRendered = false;

function readFile(files) {
  const file = files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    data = JSON.parse(e.target.result);
    updateGraph();
  }

  reader.readAsText(file);
}

function updateGraph() {
  if (!chartRendered) {
    renderChart();
    chartRendered = true;
  } else {
    processData();
    updateBars();
  }
}

function processData() {
  tagsCounter = {};
  data.forEach(dream => {
    dream.tags.forEach(tag => {
      tagsCounter[tag] = (tagsCounter[tag] || 0) + 1;
    });
  });
}

function renderChart() {
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleLinear()
    .range([0, width]);

  const y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  updateBars();

  d3.interval(updateGraph, 500);
}

function updateBars() {
  const svg = d3.select("#chart").select("svg").select("g");

  const tags = Object.keys(tagsCounter).sort((a, b) => tagsCounter[b] - tagsCounter[a]).slice(0, 10);
  const x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(tags, tag => tagsCounter[tag])]);

  const y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1)
    .domain(tags);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg.select(".x.axis")
    .transition()
    .duration(duration)
    .call(xAxis);

  svg.select(".y.axis")
    .transition()
    .duration(duration)
    .call(yAxis);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const bars = svg.selectAll(".bar")
    .data(tags, d => d);

  bars.exit()
    .transition()
    .duration(duration)
    .attr("width", 0)
    .remove();

  bars.transition()
    .duration(duration)
    .attr("x", 0)
    .attr("y", d => y(d))
    .attr("width", d => x(tagsCounter[d]))
    .attr("height", y.bandwidth())
    .style("fill", d => colorScale(d));

  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d))
    .attr("width", 0)
    .attr("height", y.bandwidth())
    .style("fill", d => colorScale(d))
    .transition()
    .duration(duration)
    .attr("width", d => x(tagsCounter[d]));

  const timestamps = data.map(dream => dream.timestamp);
  const latestTimestamp = d3.max(timestamps);
  const formattedTimestamp = new Date(latestTimestamp * 1000).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

  svg.select("text.timestamp")
    .data([formattedTimestamp])
    .join("text")
    .attr("class", "timestamp")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .text(d => `Latest Dream: ${d}`);
}