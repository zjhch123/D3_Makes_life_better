import * as d3 from 'd3';

const data = [62, 95, 81, 94, 60, 34, 63, 72, 88, 12, 90, 71, 40, 28, 42, 69];

const width = 800;
const height = 400;
const color = d3.scaleOrdinal(d3.schemeCategory10);

const leftPadding = 30;
const rightPadding = 30;
const topPadding = 30;
const bottomPadding = 30;
const gap = 10;

const linear = d3.scaleLinear().domain([0, d3.max(data)]).range([height - bottomPadding - topPadding, 0]);
const ordinal = d3.scaleBand().domain(d3.range(data.length)).range([0, width - leftPadding - rightPadding]);

const yAxis = d3.axisLeft().scale(linear);
const xAxis = d3.axisBottom().scale(ordinal);

const container = d3.select('.container')
  .append('svg')
  .attrs({
    width,
    height,
    class: 'bar',
  })
  .style('border', '1px solid green');

container.append('g')
  .attr('transform', `translate(${gap + leftPadding}, 0)`)
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attrs({
    width: ordinal.bandwidth() - gap,
    x: (_, index) => ordinal(index) - gap / 2,
    y: height - bottomPadding,
    class: 'path',
    fill: (_, i) => color(i),
  })
  .transition()
  .duration(800)
  .delay((d, i) => i * 100)
  .attrs({
    height: (d) => height - linear(d) - bottomPadding - topPadding,
    y: (d) => linear(d),
    transform: `translate(0, ${topPadding})`,
  });

container.append('g')
  .attr('transform', `translate(${leftPadding}, ${topPadding})`)
  .call(yAxis);

container.append('g')
  .attr('transform', `translate(${leftPadding}, ${height - bottomPadding})`)
  .call(xAxis);
