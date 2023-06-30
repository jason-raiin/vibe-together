import { TextField } from '@mui/material';
import React from 'react';

export function RoomNameField({ nameInputHandler, submitted }) {
  return (
    <TextField
      id="outlined-basic"
      label="Enter your room name"
      variant="outlined"
      onChange={nameInputHandler}
      InputProps={{ readOnly: submitted }}
    />
  );
}

export function RoomIdField({ roomId }) {
  return (
    <TextField
      id="outlined-basic"
      value={roomId}
      label="Room Code"
      variant="outlined"
      InputProps={{ readOnly: true }}
    />
  );
}

export function RoomIdInputField({ idInputHandler }) {
  return (
    <TextField
      id="outlined-basic"
      label="Room Code"
      variant="outlined"
      onChange={idInputHandler}
    />
  );
}
