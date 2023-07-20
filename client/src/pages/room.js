import React, { useEffect, useState } from 'react';
import ArtistList from '../lists/artists';
import TrackList from '../lists/tracks';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getRoom, getRoomDetails } from '../query/rooms';
import RadarDiagram from '../components/radar';
import { getUser } from '../query/users';
import VennDiagram from '../components/venn';

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
      <Grid container columns={2} spacing={5} padding={5}>
        <Grid item sm={1} display="flex" justifyContent="center">
          {room.trackFeatures && user.trackFeatures && (
            <RadarDiagram
              trackFeatures={[room.trackFeatures, user.trackFeatures]}
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
