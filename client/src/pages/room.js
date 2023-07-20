import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CopyLinkButton } from '../components/button';
import { RoomIdField } from '../components/field';
import RadarDiagram from '../components/radar';
import ArtistList from '../lists/artists';
import TrackList from '../lists/tracks';
import { getRoom } from '../query/rooms';
import { getUser } from '../query/users';

const RoomPage = ({ userId }) => {
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    getRoom(id).then((_room) => setRoom(_room));
  }, []);
  useEffect(() => {
    getUser(userId).then((_user) => setUser(_user));
  }, [userId]);
  console.log(user.trackFeatures);

  return (
    <div className="standard">
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
              <h1>this room is looking a little empty, add more friends now</h1>
              <div style={{ display: 'flex', gap: '1vh' }}>
                <RoomIdField roomId={id} />
                <CopyLinkButton roomId={id} />
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
      <Grid container columns={2} spacing={5} padding={5}>
        <Grid itme sm={2} display="flex" justifyContent="center">
          {room.trackFeatures && user.trackFeatures && (
            <RadarDiagram
              trackFeatures={[room.trackFeatures, user.trackFeatures]}
            />
          )}
        </Grid>
        <Grid item xs={2} sm={1}>
          <ArtistList artists={room?.topArtists} />
        </Grid>
        <Grid item xs={2} sm={1}>
          <TrackList tracks={room?.topTracks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RoomPage;
