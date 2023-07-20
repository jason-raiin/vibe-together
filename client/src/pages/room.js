import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CopyLinkButton } from '../components/button';
import { RoomIdField } from '../components/field';
import { default as RadarDiagram } from '../components/radar';
import VennDiagram from '../components/venn';
import ArtistList from '../lists/artists';
import TrackList from '../lists/tracks';
import { getRoom, getRoomDetails } from '../query/rooms';
import { getUser } from '../query/users';

const RoomPage = ({ userId }) => {
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const [usersDetails, setUsersDetails] = useState([]);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    getRoom(id).then((_room) => setRoom(_room));
    getRoomDetails(id).then((_details) => setUsersDetails(_details));
  }, []);

  useEffect(() => {
    if (userId) getUser(userId).then((_user) => setUser(_user));
  }, [userId]);

  return (
    <div className="standard">
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
              <h1>
                {room.name} is looking a little empty, add some friends here?
              </h1>
              <div style={{ display: 'flex', gap: '1vh' }}>
                <RoomIdField roomId={id} />
                <CopyLinkButton roomId={id} />
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
      <Grid container columns={2} spacing={5} padding={5}>
        <Grid item sm={1} display="flex" justifyContent="center">
          {room.trackFeatures && user.trackFeatures && (
            <RadarDiagram
              trackFeatures={[user.trackFeatures, room.trackFeatures]}
            />
          )}
        </Grid>
        <Grid item sm={1} display="flex" justifyContent="center">
          {usersDetails.length > 0 && room.topGenres && (
            <VennDiagram
              usersDetails={usersDetails}
              roomGenres={room.topGenres}
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
