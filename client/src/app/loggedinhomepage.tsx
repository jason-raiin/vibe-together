import React, { useEffect, useState } from 'react';
import { getUser, isValidAccessToken } from '../spotify/spotify';
import { addUpdateUser } from '../query/users';
import { TopArtists } from '../dtos/topArtists.dto';
import { TopTracks } from '../dtos/topTracks.dto';
import { UserProfile } from '../dtos/userProfile.dto';

const LoggedInHomePage = () => {
  const [profile, setProfile] = useState({} as UserProfile);
  const [artists, setArtists] = useState({} as TopArtists);
  const [tracks, setTracks] = useState({} as TopTracks);

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) throw new Error('no code');

  useEffect(() => {
    isValidAccessToken(accessToken)
      .then(() => getUser(accessToken))
      .then(async (user) => {
        setProfile(user.userProfile);
        setArtists(user.topArtists);
        setTracks(user.topTracks);
        addUpdateUser(user);
      })
      .catch((e) => console.error(e));
  }, []);

  const artistList = artists.items?.map((artist) => {
    return (
      <li key={artist.name}>
        {artist.name} : {artist.id}
      </li>
    );
  });

  const trackList = tracks.items?.map((track) => {
    return (
      <li key={track.name}>
        {track.name} : {track.id}
      </li>
    );
  });

  const displayName = profile?.display_name;

  return (
    <div>
      <h1>User Profile for {displayName}</h1>
      <ol>Artists: {artistList}</ol>
      <ol>Tracks: {trackList}</ol>
    </div>
  );
};

export default LoggedInHomePage;
