import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginButton } from '../components/button';
import { LOGIN_URI } from '../components/constants';

export default function SpotifyLoginRedirect() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');
  if (roomId != null) localStorage.setItem('roomId', roomId);
  // console.log(roomId);

  return (
    <div
      className="standard-outer-window"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5vh',
        marginBottom: '5vh',
        marginLeft: '5vw',
        marginRight: '5vw',
      }}
    >
      <Stack spacing={0} sx={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: '1vh' }}>
          <div
            style={{
              height: '2.5vh',
              width: '2.5vh',
              border: '0.5vh solid #97b690',
              borderRadius: '2.5vh',
              backgroundColor: '#ee5250',
            }}
          />
          <div
            style={{
              height: '2.5vh',
              width: '2.5vh',
              border: '0.5vh solid #97b690',
              borderRadius: '2.5vh',
              backgroundColor: '#5cfcf4',
            }}
          />
          <div
            style={{
              height: '2.5vh',
              width: '2.5vh',
              border: '0.5vh solid #97b690',
              borderRadius: '2.5vh',
              backgroundColor: '#fff69d',
            }}
          />
        </div>
        <div
          className="standard-inner-window"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack
            spacing={5}
            alignItems="center"
            justifyContent="center"
            className="standard-stack"
          >
            <h1>you are so close to joining your friends&apos; room</h1>
            <LoginButton />
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
