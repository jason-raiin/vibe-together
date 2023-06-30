import React from 'react';
import { Button } from '@mui/material';
import {
  CREATE_ROOM_URI,
  JOIN_CODE_URI,
  JOIN_ROOM_URI,
  LOGIN_URI,
  ROOM_URI,
} from './constants';
import { VisibilityOutlined } from '@mui/icons-material';

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

export function ViewRoomButton({ roomId }) {
  return BasicButton(`${ROOM_URI}${roomId}`, <VisibilityOutlined />);
}

function OnClickButton(onClick, url, text) {
  return (
    <Button variant="contained" href={url} onClick={onClick}>
      {text}
    </Button>
  );
}

export function CopyLinkButton({ roomId }) {
  const copy = () => {
    navigator.clipboard.writeText(JOIN_CODE_URI + roomId);
  };

  return OnClickButton(copy, '', 'Copy Link');
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
