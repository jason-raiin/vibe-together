import React, { useEffect } from 'react';
import * as venn from 'venn.js';
import * as d3 from 'd3';
import './venn.css';

const FONT = { family: 'sans-serif', size: '12px' };
export default function VennDiagram() {
  useEffect(() => vennChart());

  return <div id="venn"></div>;
}

const vennChart = () => {
  const sets = [
    { sets: ['A'], size: 10 },
    { sets: ['B'], size: 10 },
    { sets: ['C'], size: 10 },
    { sets: ['A', 'B'], size: 2 },
    { sets: ['A', 'C'], size: 2 },
    { sets: ['B', 'C'], size: 2 },
    { sets: ['A', 'B', 'C'], size: 2 },
  ];

  // draw
  const chart = venn.VennDiagram();
  const div = d3.select('#venn');
  div.datum(sets).call(chart);

  // add a tooltip
  const tooltip = d3
    .select('body')
    .append('div')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('font-family', FONT.family)
    .style('font-size', FONT.size);

  // add listeners to all the groups to display tooltip on mouseover
  div
    .selectAll('g')
    .on('mouseover', function (event, d) {
      // sort all the areas relative to the current item
      venn.sortAreas(div, d);

      // Display a tooltip with the current size
      tooltip.text(d.size + ' users').style('visibility', 'visible');

      // highlight the current path
      const selection = d3.select(this).transition('tooltip').duration(400);
      selection
        .select('path')
        .style('stroke-width', 3)
        .style('fill-opacity', d.sets.length == 1 ? 0.4 : 0.1)
        .style('stroke-opacity', 1);
    })

    .on('mousemove', function (event, d) {
      tooltip
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
    })

    .on('mouseout', function (event, d) {
      tooltip.style('visibility', 'hidden');
      const selection = d3.select(this).transition('tooltip').duration(400);
      selection
        .select('path')
        .style('stroke-width', 0)
        .style('fill-opacity', d.sets.length == 1 ? 0.25 : 0.0)
        .style('stroke-opacity', 0);
    });
};
