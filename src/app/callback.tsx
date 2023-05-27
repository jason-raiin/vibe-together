import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SpotifyService } from '../spotify/spotify.service';
//TODO: once user_top_read json is returned, redirect to profile page and display top albums/songs/artists
//TODO: figure out how to get the json data from async function helpppp

const CallBack = () => {
  const [searchParams] = useSearchParams();
  const userCode = searchParams.get('code');
  if (!userCode) return <p>dies of cringe</p>;

  const spotifyService = new SpotifyService();
  const user_response_json = spotifyService.getAccessToken(userCode);
  console.log('lul');

  return (
    <div>
      <h1>User</h1>
      <p>Code: {userCode}</p>
    </div>
  );
};

export default CallBack;
