import React from 'react';
import { Button } from '@mui/material';
import { CREATE_ROOM_URI, JOIN_ROOM_URI, LOGIN_URI } from './constants';

function button(url, text) {
  return (
    <Button variant="contained" href={url}>
      {text}
    </Button>
  );
}

export function JoinRoomButton() {
  return button(JOIN_ROOM_URI, 'Join Room');
}

export function CreateRoomButton() {
  return button(CREATE_ROOM_URI, 'Create Room');
}

export function LoginButton() {
  return button(LOGIN_URI, 'LOGIN');
}
