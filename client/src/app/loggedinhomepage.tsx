import React, { useEffect, useState } from 'react';
import { isValidAccessToken } from '../spotify/spotify';
import { getUser } from '../query/users';
import { User } from '../dtos/user.dto';

const LoggedInHomePage = () => {
  const [user, setUser] = useState({} as User);

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token');

  useEffect(() => {
    isValidAccessToken(accessToken)
      .then(({ id }) => getUser(id))
      .then((user) => setUser(user))
      .catch((e) => console.error(e));
  }, []);

  const artistList = user?.topArtists?.map((artist) => {
    return (
      <li key={artist.name}>
        {artist.name} : {artist.id}
      </li>
    );
  });

  const trackList = user?.topTracks?.map((track) => {
    return (
      <li key={track.name}>
        {track.name} : {track.id}
      </li>
    );
  });

  return (
    <div>
      <h1>
        User Profile for <a href={user?.url}>{user?.displayName}</a>
      </h1>
      <ol>Artists: {artistList}</ol>
      <ol>Tracks: {trackList}</ol>
    </div>
  );
};

export default LoggedInHomePage;
