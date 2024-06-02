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

/*function updateGraph(data) {
  const tags = data.map(d => d.tags).flat();
  const tagCounts = tags.reduce((counts, tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
    return counts;
  }, {});

  const nodes = Object.keys(tagCounts).map(tag => ({
    id: tag,
    size: tagCounts[tag]
  }));

  const links = data.flatMap(d => {
    const tags = d.tags;
    return tags.flatMap((tag, i) => tags.slice(i + 1).map(otherTag => ({
      source: tag,
      target: otherTag
    })));
  });

  const linkCounts = links.reduce((counts, link) => {
    const key = `${link.source}-${link.target}`;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

  const maxLinkCount = Math.max(...Object.values(linkCounts));

  const link = svg.selectAll(".link")
    .data(links)
    .join("line")
    .attr("class", "link")
    .attr("stroke-width", d => linkCounts[`${d.source}-${d.target}`] / maxLinkCount * 5)
    .attr("stroke-opacity", d => linkCounts[`${d.source}-${d.target}`] / maxLinkCount);

  const node = svg.selectAll(".node")
    .data(nodes)
    .join("circle")
    .attr("class", "node")
    .attr("r", d => Math.sqrt(d.size) * 5)
    .attr("fill", d => colorScale(d.id))
    .call(drag(simulation));

  node.append("title")
    .text(d => d.id);

  simulation.nodes(nodes).on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });

  simulation.force("link").links(links);
}

*/

function updateGraph(data) {
    const tags = data.map(d => d.tags).flat();
    const tagCounts = tags.reduce((counts, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {});
  
    const nodes = Object.keys(tagCounts).map(tag => ({
      id: tag,
      size: tagCounts[tag]
    }));
  
    const links = data.flatMap(d => {
      const tags = d.tags;
      return tags.flatMap((tag, i) => tags.slice(i + 1).map(otherTag => ({
        source: tag,
        target: otherTag
      })));
    });
  
    const linkCounts = links.reduce((counts, link) => {
      const key = `${link.source}-${link.target}`;
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});
  
    const maxLinkCount = Math.max(...Object.values(linkCounts));
  
    const link = svg.selectAll(".link")
      .data(links)
      .join("line")
      .attr("class", "link")
      .attr("stroke-width", d => linkCounts[`${d.source}-${d.target}`] / maxLinkCount * 5)
      .attr("stroke-opacity", d => linkCounts[`${d.source}-${d.target}`] / maxLinkCount);
  
   
  const node = svg.selectAll(".node")
  .data(nodes)
  .join("g")
  .attr("class", "node")
  .call(drag(simulation))
  .on("click", (event, d) => {
    // Log information about the clicked node
    console.log(`Node: ${d.id}`);
    console.log(`Number of tags: ${d.size}`);
    
    // Find the connected nodes
    const connectedNodes = links.filter(link => link.source === d.id || link.target === d.id)
      .map(link => link.source === d.id ? link.target : link.source);
    
    console.log("Connected nodes:");
    connectedNodes.forEach(node => {
      console.log(`- ${node}`);
    });
  });
  
    node.append("circle")
      .attr("r", d => Math.sqrt(d.size) * 5)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);
  
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(d => d.size > 10 ? d.id : "")
      .style("font-size", d => Math.sqrt(d.size) * 3 + "px");
  
    node.append("title")
      .text(d => d.id);
  
      simulation.nodes(nodes).on("tick", () => {
        link
          .attr("x1", d => Math.max(0, Math.min(width, d.source.x))) // Constrain x-coordinate within width
          .attr("y1", d => Math.max(0, Math.min(height, d.source.y))) // Constrain y-coordinate within height
          .attr("x2", d => Math.max(0, Math.min(width, d.target.x))) // Constrain x-coordinate within width
          .attr("y2", d => Math.max(0, Math.min(height, d.target.y))); // Constrain y-coordinate within height
    
        node.attr("transform", d => `translate(${Math.max(0, Math.min(width, d.x))},${Math.max(0, Math.min(height, d.y))})`);
      });
  
    simulation.force("link").links(links);
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