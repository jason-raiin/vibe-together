import React, { useEffect, useState } from 'react';
import ArtistList from '../lists/artists';
import TrackList from '../lists/tracks';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getRoom } from '../query/rooms';

const RoomPage = () => {
  const [room, setRoom] = useState({});

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    getRoom(id).then((_room) => setRoom(_room));
  }, []);

  return (
    <div className="standard">
      <Grid container spacing={5} padding={5}>
        <Grid item xs={12} sm={6}>
          <ArtistList artists={room?.topArtists} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TrackList tracks={room?.topTracks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RoomPage;
