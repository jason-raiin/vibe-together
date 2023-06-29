import React, { useEffect, useState } from 'react';
import JoinRoomButton from '../components_old/joinRoomButton';
import { getRoomsByUser, getUser } from '../query/users';
import TopArtists from '../components/topArtists';
import ArtistList from '../components/topArtists';
import TrackList from '../components/topTracks';

const UserPage = () => {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('id');

    getUser(id).then((_user) => setUser(_user));
    getRoomsByUser(id).then((_rooms) => setRooms(_rooms));
  }, []);

  return (
    <div>
      <ArtistList artists={user.topArtists} />
      <TrackList tracks={user.topTracks} />
    </div>
  );
};

export default UserPage;
