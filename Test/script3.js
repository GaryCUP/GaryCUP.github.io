const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-10)) // Adjust the strength of the charge force
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(d => Math.sqrt(d.size) * 5)); // Add collision force

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);



/*
function updateGraph(data) {
    const tags = data.map(d => d.tags).flat();
    const tagCounts = tags.reduce((counts, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {});
  
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3.select("#graph")
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);
  
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);
  
    const labelArc = d3.arc()
      .innerRadius(radius - 80)
      .outerRadius(radius - 80);
  
    const arcs = svg.selectAll(".arc")
      .data(pie(topTags))
      .join("g")
      .attr("class", "arc");
  
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));
  
    arcs.append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => `${d.data.tag}: ${d.data.count}`);
  
    svg.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("y", -radius + 20)
      .text("Top 10 Tags");
  }

function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}




let data = [];

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    data = JSON.parse(e.target.result);
    data.sort((a, b) => a.timestamp - b.timestamp);
    updateDreamSelector();
    updateGraph(data.slice(0, 1));
    updateDateDisplay(0);
  };
  reader.readAsText(file);
});
*/
// ... (previous code remains the same)
let currentTime = 0;
let isPaused = true;
let animationInterval;

function updateGraph(data) {
  const tags = data.slice(0, currentTime + 1).flatMap(d => d.tags);
  const tagCounts = tags.reduce((counts, tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
    return counts;
  }, {});

  const totalDreams = data.slice(0, currentTime + 1).length;

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([tag, count]) => ({ tag, count, percentage: (count / totalDreams) * 100 }));

  const width = 600;
  const height = 600;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select("#graph")
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie()
    .value(d => d.percentage)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 10);

  const labelArc = d3.arc()
    .innerRadius(radius - 80)
    .outerRadius(radius - 80);

  const arcs = svg.selectAll(".arc")
    .data(pie(topTags))
    .join("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i));

  arcs.append("text")
    .attr("transform", d => `translate(${labelArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .style("visibility", d => (d.endAngle - d.startAngle) > 0.2 ? "visible" : "hidden")
    .text(d => `${d.data.tag}: ${d.data.percentage.toFixed(1)}% (${d.data.count})`);

  const dreamDate = data[currentTime].timestamp;
  const formattedDate = formatDate(dreamDate);

  svg.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("y", -radius + 20)
    .text(formattedDate);
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}


function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(animationInterval);
      pauseButton.textContent = "Resume";
    } else {
      startAnimation();
      pauseButton.textContent = "Pause";
    }
  }
  
  function startAnimation() {
    animationInterval = setInterval(() => {
      if (currentTime < data.length - 1) {
        currentTime++;
        updateGraph(data);
      } else {
        clearInterval(animationInterval);
        isPaused = true;
        pauseButton.textContent = "Resume";
      }
    }, 100);
  }
  
  function stepForward() {
    if (currentTime < data.length - 1) {
      currentTime++;
      updateGraph(data);
    }
  }
// ... (remaining code remains the same)

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    data = JSON.parse(e.target.result);
    // Sort the dreams in ascending order by timestamp
    data.sort((a, b) => a.timestamp - b.timestamp);
    currentTime = 0;
    updateGraph(data);
  };
  reader.readAsText(file);
});

const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", togglePause);

const stepButton = document.getElementById("stepButton");
stepButton.addEventListener("click", stepForward);

function updateDreamSelector() {
  const dreamSelect = document.getElementById("dreamSelect");
  dreamSelect.innerHTML = "";

  data.forEach((dream, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = formatDate(dream.timestamp);
    dreamSelect.appendChild(option);
  });

  dreamSelect.addEventListener("change", function(event) {
    const selectedIndex = parseInt(event.target.value);
    updateGraph(data.slice(0, selectedIndex + 1));
    updateDateDisplay(selectedIndex);
  });
}

function updateDateDisplay(time) {
  const dateDisplay = document.getElementById("dateDisplay");
  const dream = data[time];
  if (dream) {
    const timestamp = dream.timestamp;
    const formattedDate = formatDate(timestamp);
    dateDisplay.textContent = formattedDate;
  } else {
    dateDisplay.textContent = "";
  }
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

function padZero(number) {
  return number < 10 ? "0" + number : number;
}