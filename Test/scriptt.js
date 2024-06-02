// Read the text file
fetch('dreams.txt')
  .then(response => response.text())
  .then(data => {
    const dreamEntries = data.split('------------------------------------------------------------');
    const dreamData = [];

    dreamEntries.forEach(entry => {
      const dateMatch = entry.match(/Date: (\d{4})-(\d{2})-(\d{2})/);
      if (dateMatch) {
        const year = parseInt(dateMatch[1]);
        const peopleMatch = entry.match(/Characters: (.*)/);
        if (peopleMatch) {
          const people = peopleMatch[1].split(', ');
          people.forEach(person => {
            const existingEntry = dreamData.find(d => d.year === year && d.person === person);
            if (existingEntry) {
              existingEntry.count++;
            } else {
              dreamData.push({ year, person, count: 1 });
            }
          });
        }
      }
    });

    createChart(dreamData);
  });

function createChart(data) {
  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 200, bottom: 40, left: 60 };

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleLinear()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleBand()
    .range([margin.top, height - margin.bottom])
    .padding(0.1);

  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .attr("class", "x-axis");

  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("class", "y-axis");

  function update(index) {
    const yearData = d3.rollup(data.slice(0, index + 1), v => v.length, d => d.year, d => d.person);

    const people = Array.from(yearData.values()).flatMap(year => Array.from(year.keys()));
    const uniquePeople = Array.from(new Set(people));

    x.domain([0, d3.max(yearData, year => d3.max(year.values()))]);
    y.domain(uniquePeople);
    colors.domain(uniquePeople);

    const bars = svg.selectAll(".bar")
      .data(uniquePeople, person => person);

    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", person => y(person))
      .attr("x", margin.left)
      .attr("height", y.bandwidth())
      .attr("width", 0)
      .attr("fill", person => colors(person))
      .merge(bars)
      .transition()
      .duration(200)
      .attr("width", person => {
        const count = yearData.get(data[index].year)?.get(person) || 0;
        return x(count) - margin.left;
      });

    bars.exit()
      .transition()
      .duration(200)
      .attr("width", 0)
      .remove();

    svg.select(".x-axis")
      .transition()
      .duration(200)
      .call(xAxis);

    svg.select(".y-axis")
      .transition()
      .duration(200)
      .call(yAxis);
  }

  let currentIndex = 0;
  const interval = d3.interval(() => {
    update(currentIndex);
    currentIndex++;
    if (currentIndex >= data.length) {
      interval.stop();
    }
  }, 100);
}