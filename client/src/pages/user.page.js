import React, { useEffect, useState } from 'react';
import { getRoomsByUser, getUser } from '../query/users';
import ArtistList from '../components/artists.component';
import TrackList from '../components/tracks.component';
import { Grid } from '@mui/material';
import RoomList from '../components/rooms.component';
import {
  CreateRoomButton,
  JoinRoomButton,
} from '../components/button.component';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getUser(userId).then((_user) => setUser(_user));
    getRoomsByUser(userId).then((_rooms) => setRooms(_rooms));
  }, []);

  return (
    <div className="standard">
      <CreateRoomButton />
      <JoinRoomButton />
      <RoomList rooms={rooms} />
      <Grid container spacing={5} padding={5}>
        <Grid item xs={12} sm={6}>
          <ArtistList artists={user.topArtists} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TrackList tracks={user.topTracks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserPage;
