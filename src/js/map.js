import * as d3 from 'd3';
import chinaMap from '../data/china.geo.json';

const colors = [
  '#7fb80e',
  '#b3424a',
  '#769149',
  '#c76968',
  '#6d8346',
  '#bb505d',
  '#78a355',
  '#987165',
];

const width = 800;
const height = 600;

const projection = d3.geoMercator()
  .center([113, 41])
  .scale(600);

const path = d3.geoPath().projection(projection);

const zoomed = function () {
  d3.select('.map').selectAll('g')
    .attr('transform', d3.event.transform);
};

const zoom = d3.zoom().on('zoom', zoomed);

d3.select('.container')
  .append('svg')
  .attrs({
    width,
    height,
    class: 'map',
  })
  .style('border', '1px solid red')
  .call(zoom)
  .append('g')
  .selectAll('path')
  .data(chinaMap.features)
  .enter()
  .append('path')
  .attrs({
    stroke: '#eee',
    d: path,
    class: 'path',
  })
  .attr('fill', (_, index) => {
    return colors[index % colors.length];
  })
  .style('vector-effect', 'non-scaling-stroke');
