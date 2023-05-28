import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';

function CallBack() {
  const [userProfile, setUserProfile] = useState({});
  const spotifyService = new SpotifyService();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    spotifyService
      .getAccessToken(code)
      .then((accessToken) => spotifyService.getUserProfile(accessToken))
      .then((userProfile) => setUserProfile(userProfile));
  }, []);

  console.log(userProfile);

  return (
    <div>
      <h1>User</h1>
      <p>Code: {code}</p>
    </div>
  );
}

export default CallBack;
