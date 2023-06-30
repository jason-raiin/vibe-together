import React from 'react';
import { Button } from '@mui/material';
import {
  CREATE_ROOM_URI,
  JOIN_CODE_URI,
  JOIN_ROOM_URI,
  LOGIN_URI,
} from './constants';

function BasicButton(url, text) {
  return (
    <Button variant="contained" href={url}>
      {text}
    </Button>
  );
}

export function JoinRoomButton() {
  return BasicButton(JOIN_ROOM_URI, 'Join Room');
}

export function CreateRoomButton() {
  return BasicButton(CREATE_ROOM_URI, 'Create Room');
}

export function LoginButton() {
  return BasicButton(LOGIN_URI, 'Login');
}

export function CopyLinkButton({ roomId }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        navigator.clipboard.writeText(JOIN_CODE_URI + roomId);
      }}
    >
      Copy Link
    </Button>
  );
}

export function SubmitNameButton({ nameSubmitHandler }) {
  return (
    <Button variant="contained" onClick={nameSubmitHandler}>
      Create
    </Button>
  );
}

export function JoinRoomCodeButton({ idSubmitHandler }) {
  return (
    <Button variant="contained" onClick={idSubmitHandler}>
      Join
    </Button>
  );
}

export function LogoutButton({ logout }) {
  return (
    <Button variant="contained" onClick={logout} href="/">
      Log Out
    </Button>
  );
}
