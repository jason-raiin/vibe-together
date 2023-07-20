import { TextField } from '@mui/material';
import React from 'react';
import './componentstyles.css';

export function EmailField({ emailInputHandler }) {
  return (
    <TextField
      id="outlined-basic"
      label="Enter your email address to register"
      variant="outlined"
      onChange={emailInputHandler}
      className="basic-field"
    />
  );
}

export function RoomNameField({ nameInputHandler, submitted }) {
  return (
    <TextField
      id="outlined-basic"
      label="Enter your room name"
      variant="outlined"
      onChange={nameInputHandler}
      InputProps={{ readOnly: submitted }}
      className="basic-field"
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
      className="basic-field"
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
      className="basic-field"
    />
  );
}
