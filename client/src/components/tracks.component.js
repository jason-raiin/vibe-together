import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';

const TrackList = ({ tracks }) => {
  const trackList = tracks?.slice(0, 10).map((track, index) => {
    const artistList = track.artists?.map((artist) => {
      return (
        <li key={artist.id}>
          <a href={artist.url}>{artist.name}</a>
        </li>
      );
    });

    return (
      <TableRow key={track.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ width: 1 / 5 }}>
          <img src={track.images[0]?.url} width="100%" />
        </TableCell>
        <TableCell>
          <a href={track.url}>{track.name}</a>
        </TableCell>
        <TableCell>
          <ul className="no-bullets">{artistList}</ul>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <h2>Top Tracks</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{trackList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrackList;
