import React, { useEffect } from 'react';
import * as venn from 'venn.js';
import * as d3 from 'd3';

export default function VennDiagram() {
  useEffect(() => vennChart());

  return <div id="venn"></div>;
}

const vennChart = () => {
  var sets = [
    { sets: ['A'], size: 12 },
    { sets: ['B'], size: 14 },
    { sets: ['C'], size: 7 },
    { sets: ['A', 'B'], size: 0 },
    { sets: ['A', 'C'], size: 2 },
    { sets: ['B', 'C'], size: 2 },
    { sets: ['A', 'B', 'C'], size: 2 },
  ];

  var chart = venn.VennDiagram();
  d3.select('#venn').datum(sets).call(chart);
};
