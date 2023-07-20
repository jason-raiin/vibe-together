import React, { useEffect } from 'react';
import * as venn from 'venn.js';
import * as d3 from 'd3';
import './venn.css';

const FONT = { family: 'sans-serif', size: '12px' };
const CIRCLE_COLORS = ['palegoldenrod', 'paleturquoise', 'palevioletred'];
const DEFAULT_OPACITY = 0.4;
const CIRCLE_SIZE = { L: 5, M: 1, S: 0.2 };

export default function VennDiagram({ usersDetails, roomGenres }) {
  useEffect(() => vennChart(sets(usersDetails, roomGenres)), []);

  return <div id="venn"></div>;
}

const sets = (usersDetails, roomGenres) => {
  const roomTop3Genres = roomGenres.slice(0, 3).map((genre) => genre.name);
  const genreSet = roomTop3Genres.map((genre) => ({
    sets: [genre],
    size: CIRCLE_SIZE.L,
  }));

  const intersectionSet = roomTop3Genres.map((genre, index) => ({
    sets: [genre, roomTop3Genres[(index + 1) % 3]],
    size: CIRCLE_SIZE.M,
  }));

  const userSet = usersDetails.map(({ displayName, images }) => ({
    sets: [displayName],
    size: CIRCLE_SIZE.S,
    images,
  }));

  const userGenreSet = usersDetails.flatMap(({ displayName, topGenres }) => {
    const userTop20Genres = topGenres.slice(0, 20).map((genre) => genre.name);
    const multiGenreSet = userTop20Genres.filter((genre) =>
      roomTop3Genres.includes(genre),
    );
    const singleGenreSet = multiGenreSet.map((genre) => ({
      sets: [genre, displayName],
      size: CIRCLE_SIZE.S,
    }));
    multiGenreSet.push(displayName);
    return [...singleGenreSet, { sets: multiGenreSet, size: CIRCLE_SIZE.S }];
  });

  const sets = [...genreSet, ...userSet, ...intersectionSet, ...userGenreSet];
  return sets;
};

const vennChart = (sets) => {
  // draw default venn diagram
  const chart = venn.VennDiagram();
  const div = d3.select('#venn');
  div.datum(sets).call(chart);

  // circle styles
  d3.selectAll('#venn .venn-circle path')
    .style('fill', (_, i) =>
      i < CIRCLE_COLORS.length ? CIRCLE_COLORS[i] : 'grey',
    )
    .style('fill-opacity', DEFAULT_OPACITY)
    .style('stroke', (_, i) => CIRCLE_COLORS[i])
    .style('stroke-opacity', 0);

  // TODO: user images
  // d3.selectAll('#venn .venn-circle path')
  //   .append('svg:image')
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('width', 50)
  //   .attr('height', 50)
  //   .attr(
  //     'xlink:href',
  //     'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainamerica.png',
  //   );

  // text label styles
  d3.selectAll('#venn .venn-circle text')
    .style('fill', 'black')
    .style('font-size', '24px')
    .style('font-weight', '50');

  // add a tooltip
  const tooltip = d3
    .select('body')
    .append('div')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('font-family', FONT.family)
    .style('font-size', FONT.size);

  // highlights on mouseover
  div
    .selectAll('g')
    .on('mouseover', function (event, d) {
      // sort all the areas relative to the current item
      venn.sortAreas(div, d);

      // Display a tooltip with the current size
      // tooltip.text(d.size + ' users').style('visibility', 'visible');

      // highlight the current path
      const selection = d3.select(this).transition('tooltip').duration(200);
      selection
        .select('path')
        .style('stroke-width', 3)
        .style('fill-opacity', d.sets.length == 1 ? 0.7 : 0.1)
        .style('stroke-opacity', 1);
    })

    .on('mousemove', function (event, d) {
      tooltip
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
    })

    .on('mouseout', function (event, d) {
      // tooltip.style('visibility', 'hidden');
      const selection = d3.select(this).transition('tooltip').duration(200);
      selection
        .select('path')
        .style('stroke-width', 0)
        .style('fill-opacity', d.sets.length == 1 ? DEFAULT_OPACITY : 0.0)
        .style('stroke-opacity', 0);
    });
};
