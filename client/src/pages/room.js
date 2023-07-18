import React, { useEffect, useState } from 'react';
import ArtistList from '../lists/artists';
import TrackList from '../lists/tracks';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getRoom } from '../query/rooms';
import RadarDiagram from '../components/radar';
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

  return (
    <div className="standard">
      <Grid container columns={2} spacing={5} padding={5}>
        <Grid item sm={2} display="flex" justifyContent="center">
          {room.trackFeatures && user.trackFeatures && (
            <RadarDiagram
              trackFeatures={[user.trackFeatures, room.trackFeatures]}
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
