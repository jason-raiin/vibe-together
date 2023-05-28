import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';

function CallBack() {
  const [artists, setArtists] = useState([]);
  const spotifyService = new SpotifyService();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    spotifyService
      .getAccessToken(code)
      .then((accessToken) => spotifyService.getUserProfile(accessToken))
      .then((userProfile) => setArtists(userProfile.items))
      .catch((e) => console.error(e.message));
  }, []);

  const artistList = artists.map((x) => {
    return <li key={x}>{x}</li>;
  });

  return (
    <div>
      <h1>User</h1>
      <p>Code: {code}</p>
      <ul>Artists: {artistList}</ul>
    </div>
  );
}

export default CallBack;
