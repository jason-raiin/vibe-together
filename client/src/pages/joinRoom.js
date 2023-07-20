import { Box, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinRoomCodeButton } from '../components/button';
import { RoomIdInputField } from '../components/field';
import { joinRoom } from '../query/rooms';

export default function JoinRoomPage({ userId }) {
  const [roomId, setRoomId] = useState('');
  const [invalid, setInvalid] = useState(false);
  const idInputHandler = (event) => {
    setRoomId(event.target.value);
    setInvalid(false);
  };

  const navigate = useNavigate();
  const idSubmitHandler = async () => {
    const room = await joinRoom(userId, roomId);
    if (!room) setInvalid(true);
    else navigate(`/room?id=${roomId}`);
  };

  return (
    <div
      className="standard-outer-window"
      style={{
        display: 'flex',
        height: '30vh',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '15vh',
        marginRight: '15vh',
        marginTop: '5vh',
        marginBottom: '5vh',
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
            height: '30vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <h2>Join your friend&#39;s room!</h2>
            <div style={{ display: 'flex', gap: '1vh' }}>
              <RoomIdInputField idInputHandler={idInputHandler} />
              <JoinRoomCodeButton idSubmitHandler={idSubmitHandler} />
            </div>
            {invalid && <div>Invalid Room Code!</div>}
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
