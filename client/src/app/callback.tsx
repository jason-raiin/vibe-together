import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';

function CallBack() {
  const [profile, setProfile] = useState({ id: '', display_name: '' });
  const [artists, setArtists] = useState([{ name: '', id: '' }]);
  const [tracks, setTracks] = useState([{ name: '', id: '' }]);

  const spotifyService = new SpotifyService();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    spotifyService
      .getAccessToken(code)
      .then((accessToken) => {
        return {
          userProfile: spotifyService.getUserProfile(accessToken),
          topArtists: spotifyService.getUserTopArtists(accessToken),
          topTracks: spotifyService.getUserTopTracks(accessToken),
        };
      })
      .then(async ({ userProfile, topArtists, topTracks }) => {
        setProfile(await userProfile);
        setArtists((await topArtists).items);
        setTracks((await topTracks).items);
      })
      .catch((e) => console.error(e));
  }, []);

  const artistList = artists.map((x) => {
    return (
      <li key={x.name}>
        {x.name} : {x.id}
      </li>
    );
  });

  const trackList = tracks.map((x) => {
    return (
      <li key={x.name}>
        {x.name} : {x.id}
      </li>
    );
  });

  const displayName = profile?.display_name;

  return (
    <div>
      <h1>User Profile for {displayName}</h1>
      <p>Code: {code}</p>
      <ol>Artists: {artistList}</ol>
      <ol>Tracks: {trackList}</ol>
    </div>
  );
}

export default CallBack;
