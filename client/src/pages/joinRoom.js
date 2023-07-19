import { Box, Grid } from '@mui/material';
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
      className="standard-box"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '15vh',
        marginRight: '15vh',
        marginTop: '5vh',
        marginBottom: '5vh',
        paddingTop: '10vh',
        paddingBottom: '10vh',
      }}
    >
      <h2>Join your friend&#39;s room!</h2>
      <Grid container spacing={5} columns={2}>
        <Grid item sm={1}>
          <Box display="flex" justifyContent="right">
            <RoomIdInputField idInputHandler={idInputHandler} />
          </Box>
        </Grid>
        <Grid item sm={1}>
          <Box display="flex" justifyContent="left">
            <JoinRoomCodeButton idSubmitHandler={idSubmitHandler} />
          </Box>
        </Grid>
        <Grid item sm={2}>
          {invalid && <div>Invalid Room Code!</div>}
        </Grid>
      </Grid>
    </div>
  );
}
