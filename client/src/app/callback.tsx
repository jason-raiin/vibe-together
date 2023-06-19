import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';
import { redirect } from 'react-router-dom';

const CallBack = () => {
  const [success, setSuccess] = useState(false);

  const spotifyService = new SpotifyService();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    spotifyService
      .getAccessToken(code)
      .then(async () => {
        redirect('');
      })
      .catch((e) => console.error(e));

    if (success) {
      redirect('');
    }
  }, []);

  return <div>not working</div>;
};

export default CallBack;
