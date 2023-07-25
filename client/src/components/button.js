import { VisibilityOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import './componentstyles.css';

import {
  CREATE_ROOM_URI,
  JOIN_CODE_URI,
  JOIN_ROOM_URI,
  LOGIN_URI,
  ROOM_URI,
} from './constants';

function BasicButton(url, text) {
  return (
    <Button variant="contained" href={url} className="basic-button">
      {text}
    </Button>
  );
}

function SpotifyButton(url, text) {
  return (
    <Button variant="contained" href={url} className="spotify-button">
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
  return SpotifyButton(LOGIN_URI, 'Login to Spotify');
}

export function ViewRoomButton({ roomId }) {
  return BasicButton(`${ROOM_URI}${roomId}`, <VisibilityOutlined />);
}

export function GoToRoomButton({ roomId }) {
  return BasicButton(`${ROOM_URI}${roomId}`, 'Go to your Room');
}

function OnClickButton(onClick, url, text) {
  return (
    <Button
      variant="contained"
      href={url}
      onClick={onClick}
      className="basic-button"
    >
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
    <Button
      variant="contained"
      onClick={nameSubmitHandler}
      className="basic-button"
    >
      Create
    </Button>
  );
}

export function JoinRoomCodeButton({ idSubmitHandler }) {
  return (
    <Button
      variant="contained"
      onClick={idSubmitHandler}
      className="basic-button"
    >
      Join
    </Button>
  );
}

export function SubmitEmailButton({ emailSubmitHandler }) {
  return (
    <Button
      variant="contained"
      onClick={emailSubmitHandler}
      className="spotify-button"
    >
      Submit Email
    </Button>
  );
}

export function LogoutButton({ logout }) {
  return (
    <Button
      variant="contained"
      onClick={logout}
      href="/"
      className="basic-button"
    >
      Log Out
    </Button>
  );
}
