import React, { useEffect, useState } from 'react';
import { getRoomsByUser, getUser } from '../query/users';
import ArtistList from '../lists/artists';
import TrackList from '../lists/tracks';
import { Box, Grid } from '@mui/material';
import RoomList from '../lists/rooms';
import { CreateRoomButton, JoinRoomButton } from '../components/button';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getUser(userId).then((_user) => setUser(_user));
    getRoomsByUser(userId).then((_rooms) => setRooms(_rooms));
  }, []);

  return (
    <div className="standard">
      <Grid container columns={2} spacing={5} padding={5}>
        <Grid item sm={1} display="flex" justifyContent="right">
          <CreateRoomButton />
        </Grid>

        <Grid item sm={1} display="flex" justifyContent="left">
          <JoinRoomButton />
        </Grid>

        <Grid item sm={2}>
          <RoomList rooms={rooms} />
        </Grid>

        <Grid item xs={2} sm={1} display="flex">
          <ArtistList artists={user.topArtists} />
        </Grid>
        <Grid item xs={2} sm={1}>
          <TrackList tracks={user.topTracks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserPage;
