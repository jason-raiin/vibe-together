import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import React from 'react';

const ArtistList = ({ artists }) => {
  const artistList = artists?.slice(0, 10).map((artist, index) => {
    return (
      <TableRow key={artist.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ width: { xs: '30%', sm: '20%' } }}>
          <img src={artist.images[0]?.url} width="100%" />
        </TableCell>
        <TableCell>
          <a href={artist.url}>{artist.name}</a>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <h2>Top Artists</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{artistList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ArtistList;
