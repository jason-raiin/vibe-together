import { Box, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import {
  CopyLinkButton,
  GoToRoomButton,
  SubmitNameButton,
} from '../components/button';
import { RoomIdField, RoomNameField } from '../components/field';
import { newRoom } from '../query/rooms';

export default function CreateRoomPage({ userId }) {
  const [name, setName] = useState('');
  const nameInputHandler = (event) => setName(event.target.value);

  const [roomId, setRoomId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const nameSubmitHandler = async () => {
    const room = await newRoom(userId, name);
    setRoomId(room.roomId);
    setSubmitted(true);
  };

  return (
    <div
      className="standard-outer-window"
      style={{
        display: 'flex',
        height: '40vh',
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
            height: '40vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {' '}
          <Stack spacing={3} alignItems="center" justifyContent="center">
            <h2>Create your Room!</h2>
            <div style={{ display: 'flex', gap: '1vh' }}>
              <RoomNameField
                nameInputHandler={nameInputHandler}
                submitted={submitted}
              />

              <SubmitNameButton nameSubmitHandler={nameSubmitHandler} />
            </div>
            <div style={{ display: 'flex', gap: '1vh' }}>
              <RoomIdField roomId={roomId} />

              <CopyLinkButton roomId={roomId} />
            </div>

            {submitted && <GoToRoomButton roomId={roomId} />}
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
