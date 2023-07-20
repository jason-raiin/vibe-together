import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
} from '@mui/material';
import React from 'react';

const ArtistList = ({ artists }) => {
  const artistList = artists?.slice(0, 10).map((artist, index) => {
    return (
      <TableRow key={artist.id}>
        <TableCell className="listFont">{index + 1}</TableCell>
        <TableCell sx={{ width: { xs: '30%', sm: '20%' } }}>
          <img src={artist.images[0]?.url} width="100%" />
        </TableCell>
        <TableCell className="listFont">
          <a href={artist.url}>{artist.name}</a>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <h2>Top Artists</h2>
      <TableContainer>
        <Table
          className="listContainer"
          sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: 'none' } }}
        >
          <TableBody>{artistList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ArtistList;
