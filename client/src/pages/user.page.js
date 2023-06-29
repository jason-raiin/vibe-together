import React, { useEffect, useState } from 'react';
import { getRoomsByUser, getUser } from '../query/users';
import ArtistList from '../components/artistList';
import TrackList from '../components/trackList';
import { Grid } from '@mui/material';

const UserPage = () => {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('id');

    getUser(id).then((_user) => setUser(_user));
    getRoomsByUser(id).then((_rooms) => setRooms(_rooms));
  }, []);

  return (
    <div className="standard">
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
