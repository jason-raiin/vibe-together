import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './radar.css';

export default function RadarDiagram({ trackFeatures }) {
  useEffect(() => radar(trackFeatures), []);

  return <div id="radar"></div>;
}

const radar = (trackFeatures) => {
  const data = trackFeatures;
  const features = Object.keys(trackFeatures[0]);

  const width = 600;
  const height = 600;
  const svg = d3
    .select('#radar')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
  const ticks = [2, 4, 6, 8, 10];

  svg
    .selectAll('circle')
    .data(ticks)
    .join((enter) =>
      enter
        .append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('r', (d) => radialScale(d)),
    );

  const angleToCoordinate = (angle, value) => {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { x: width / 2 + x, y: height / 2 - y };
  };

  const featureData = features.map((f, i) => {
    let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
    return {
      name: f,
      angle: angle,
      line_coord: angleToCoordinate(angle, 10),
      label_coord: angleToCoordinate(angle, 10.5),
    };
  });

  // draw axis line
  svg
    .selectAll('line')
    .data(featureData)
    .join((enter) =>
      enter
        .append('line')
        .attr('x1', width / 2)
        .attr('y1', height / 2)
        .attr('x2', (d) => d.line_coord.x)
        .attr('y2', (d) => d.line_coord.y)
        .attr('stroke', 'black'),
    );

  // draw axis label
  svg
    .selectAll('.axislabel')
    .data(featureData)
    .join((enter) =>
      enter
        .append('text')
        .attr('x', (d) => d.label_coord.x)
        .attr('y', (d) => d.label_coord.y)
        .text((d) => d.name),
    );

  let line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);
  let colors = ['darkorange', 'gray', 'navy'];

  const getPathCoordinates = (data_point) => {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
  };

  svg
    .selectAll('path')
    .data(data)
    .join((enter) =>
      enter
        .append('path')
        .datum((d) => getPathCoordinates(d))
        .attr('d', line)
        .attr('stroke-width', 3)
        .attr('stroke', (_, i) => colors[i])
        .attr('fill', (_, i) => colors[i])
        .attr('stroke-opacity', 1)
        .attr('opacity', 0.5),
    );
};
