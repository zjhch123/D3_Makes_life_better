import * as d3 from 'd3';

const labels = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const data = [10, 99, 29, 75, 59, 79, 24, 32, 61, 50];

const max = d3.max(data);

const width = 800;
const height = 600;

const padding = { top: 50, left: 50, right: 50, bottom: 50 };

const xScale = d3.scaleLinear()
  .domain([1, 10])
  .range([0, width - padding.left - padding.right]);

const yScale = d3.scaleLinear()
  .domain([0, max])
  .range([height - padding.top - padding.bottom, 0]);

const xAsix = d3.axisBottom().scale(xScale).tickFormat((d, i) => labels[i]);
const yAsix = d3.axisLeft().scale(yScale);

const linePath = d3.line().x((d, i) => xScale(i + 1)).y(d => yScale(d));

const svg = d3.select('.container')
  .append('svg')
  .attrs({
    width,
    height,
    style: 'border: 1px solid red',
  });

svg.append('g')
  .attrs({
    class: 'axis',
    transform: `translate(${padding.left}, ${height - padding.bottom})`,
  })
  .call(xAsix);

svg.append('g')
  .attrs({
    class: 'axis',
    transform: `translate(${padding.left}, ${padding.top})`,
  })
  .call(yAsix);

svg.append('g')
  .attrs({
    class: 'line',
    transform: `translate(${padding.left}, ${padding.top})`,
  })
  .append('path')
  .attrs({
    d: linePath(data),
    class: 'line-path',
    fill: 'none',
    strokeWidth: 3,
    stroke: '#8a5d19',
  });

svg.append('g')
  .attrs({
    class: 'circle',
    transform: `translate(${padding.left}, ${padding.top})`,
  })
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attrs({
    transform: (d, i) => `translate(${xScale(i + 1)}, ${yScale(d)})`,
    fill: '#78cdd1',
    r: 0,
  })
  .transition()
  .duration(1000)
  .delay((d, i) => i * 150)
  .attrs({
    r: 6,
  });
