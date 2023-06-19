import React, { useEffect, useState } from 'react';
import { redirect, useSearchParams, useNavigate } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';

const CallBack = () => {
  const spotifyService = new SpotifyService();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    spotifyService
      .getAccessToken(code)
      .then(() => {
        navigate('/');
      })
      .catch((e) => console.error(e));
  }, []);

  return <div>not working</div>;
};

export default CallBack;
