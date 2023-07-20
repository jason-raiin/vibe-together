import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import React from 'react';
import './liststyles.css';

const TrackList = ({ tracks }) => {
  const trackList = tracks?.slice(0, 10).map((track, index) => {
    return (
      <TableRow key={track.id}>
        <TableCell className="listFont">{index + 1}</TableCell>
        <TableCell sx={{ width: { xs: '30%', sm: '20%' } }}>
          <img src={track.images[0]?.url} width="100%" />
        </TableCell>
        <TableCell className="listFont">
          <a href={track.url}>{track.name}</a>
        </TableCell>
        {/* <TableCell>
          <ul className="no-bullets">{artistList}</ul>
        </TableCell> */}
      </TableRow>
    );
  });

  return (
    <div>
      <h2>Top Tracks</h2>
      <TableContainer>
        <Table
          className="listContainer"
          sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: 'none' } }}
        >
          <TableBody>{trackList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrackList;
