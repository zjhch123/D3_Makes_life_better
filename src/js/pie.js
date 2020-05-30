import * as d3 from 'd3';

const width = 800;
const height = 600;

const data = [30, 10, 43, 55, 13];

const pie = d3.pie();
const pieData = pie(data);
const color = d3.scaleOrdinal(d3.schemeCategory10);

const outerRadius = 250;
const innerRadius = 175;

const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

const arcOver = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius + 20);

const arcs = d3.select('.container')
  .append('svg')
  .attrs({
    width,
    height,
    style: 'border: 1px solid #3c3645',
  })
  .selectAll('g')
  .data(pieData)
  .enter()
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

arcs.append('path')
  .attrs({
    d: arc,
    fill: (_, i) => color(i),
  })
  .on('mouseover', function () {
    d3.select(this).transition()
      .duration(50)
      .attr('d', arcOver);
  })
  .on('mouseout', function () {
    d3.select(this).transition()
      .duration(50)
      .attr('d', arc);
  });

arcs.append('text')
  .attrs({
    transform: d => `translate(${arc.centroid(d)})`,
    'text-anchor': 'middle',
    style: 'pointer-events: none',
  })
  .text(d => d.data);
