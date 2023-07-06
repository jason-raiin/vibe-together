import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { newRoom } from '../query/rooms';
import {
  CopyLinkButton,
  GoToRoomButton,
  SubmitNameButton,
} from '../components/button';
import { RoomIdField, RoomNameField } from '../components/field';

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
    <div className="standard">
      <h2>Create your Room!</h2>
      <Grid container spacing={5} columns={2}>
        <Grid item sm={1}>
          <Box display="flex" justifyContent="right">
            <RoomNameField
              nameInputHandler={nameInputHandler}
              submitted={submitted}
            />
          </Box>
        </Grid>
        <Grid item sm={1}>
          <Box display="flex" justifyContent="left">
            <SubmitNameButton nameSubmitHandler={nameSubmitHandler} />
          </Box>
        </Grid>
        <Grid item sm={1}>
          <Box display="flex" justifyContent="right">
            <RoomIdField roomId={roomId} />
          </Box>
        </Grid>
        <Grid item sm={1}>
          <Box display="flex" justifyContent="left">
            <CopyLinkButton roomId={roomId} />
          </Box>
        </Grid>
        {submitted && (
          <Grid item sm={2}>
            <Box display="flex" justifyContent="center">
              <GoToRoomButton roomId={roomId} />
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
