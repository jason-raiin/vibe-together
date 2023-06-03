import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';

function CallBack() {
  const [artists, setArtists] = useState([{ name: '', id: '' }]);
  const spotifyService = new SpotifyService();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    spotifyService
      .getAccessToken(code)
      .then((accessToken) => spotifyService.getUserTopArtists(accessToken))
      .then((topArtists) => setArtists(topArtists.items))
      .catch((e) => console.error(e));
  }, []);

  const artistList = artists.map((x) => {
    return (
      <li key={x.name}>
        {x.name} : {x.id}
      </li>
    );
  });

  return (
    <div>
      <h1>User Profile</h1>
      <p>Code: {code}</p>
      <ol>Artists: {artistList}</ol>
    </div>
  );
}

export default CallBack;
