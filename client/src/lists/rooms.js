import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ViewRoomButton } from '../components/button';
import './liststyles.css';

export default function RoomList({ rooms }) {
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [height, setHeight] = useState(0);
  const rowReference = useRef(null);
  useEffect(() => {
    const currHeight = rowReference.current?.clientHeight;
    setHeight(currHeight ? currHeight : 0);
  });

  const rowsPerPage = 5;
  const firstRow = page * rowsPerPage;
  const lastRow = (page + 1) * rowsPerPage;
  const emptyRows = lastRow > rooms.length ? lastRow - rooms.length : 0;

  const roomList = rooms?.slice(firstRow, lastRow).map((room) => {
    return (
      <TableRow key={room.id} ref={rowReference}>
        <TableCell className="listFont">{room.name}</TableCell>
        <TableCell className="listFont" align="center">
          {room.users.length}
        </TableCell>
        <TableCell align="center">
          <ViewRoomButton roomId={room.id} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Box>
      <h2 className="listHeaderFont">Your Rooms</h2>
      <Box display="flex" justifyContent="center">
        <TableContainer sx={{ width: { xs: '100%', sm: '50%' } }}>
          <Table
            className="listContainer"
            sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: 'none' } }}
          >
            <TableHead>
              <TableRow>
                <TableCell className="listFont">Room Name</TableCell>
                <TableCell className="listFont" align="center">
                  Pals
                </TableCell>
                <TableCell className="listFont" align="center">
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomList}
              {emptyRows > 0 && (
                <TableRow style={{ height: height * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className="listFont"
                  count={rooms.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
