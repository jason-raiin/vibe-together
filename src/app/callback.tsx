import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';
//TODO: once user_top_read json is returned, redirect to profile page and display top albums/songs/artists
//TODO: figure out how to get the json data from async function helpppp

const CallBack = () => {
  const [searchParams] = useSearchParams();
  const usercode = searchParams.get('code');
  const spotifyservice = new SpotifyService();

  if (usercode) {
    const user_response_json = spotifyservice.getAccessToken(usercode);
  }

  return (
    <div>
      <h1>User</h1>
      <p>Code: {usercode}</p>
    </div>
  );
};

export default CallBack;
