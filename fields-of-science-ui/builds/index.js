const BARS_DATA = JSON.parse(document.getElementById("stuff").innerHTML);
const color = "steelblue";
const height = 500;
const width = 1000;
const margin = { top: 30, right: 0, bottom: 30, left: 40 };

const x = d3
  .scaleBand()
  .domain(d3.range(BARS_DATA.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);
const y = d3
  .scaleLinear()
  .domain([0, d3.max(BARS_DATA, (d) => d.collaborations)])
  .nice()
  .range([height - margin.bottom, margin.top]);
const xAxis = (g) =>
  g.attr("transform", `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .tickFormat((i) => BARS_DATA[i].name)
      .tickSizeOuter(0)
  );
const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Client Count")
    );

const svg = d3.select("#bar_plot").attr("viewBox", [0, 0, width, height]);

const plot = svg
  .append("g")
  .attr("fill", color)
  .selectAll("rect")
  .data(BARS_DATA)
  .join("a")
  .attr("href", (d) => `${d.name}.html`);
plot
  .append("rect")
  .attr("x", (d, i) => x(i))
  .attr("width", x.bandwidth())
  .attr("y", y(0))
  .attr("height", y(0))
  .transition()
  .duration(1000)
  .attr("y", (d) => y(d.collaborations))
  .attr("height", (d) => y(0) - y(d.collaborations));
plot
  .append("text")
  .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
  .attr("y", y(0) - 5)
  .style("stroke", "white")
  .style("fill", "white")
  .style("text-anchor", "middle")
  .text((d) => d.collaborations);

svg.append("g").call(xAxis);

svg.append("g").call(yAxis);
