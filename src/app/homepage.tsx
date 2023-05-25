import React from 'react';
import { LOGIN_URL_PARAMS } from '../spotify/constants';
// TODO: use URLSearchParams
// TODO: add scope to user auth

const HomePage = () => {
  return (
    <div>
      <h1>Music Room</h1>
      <p>Connect and Compare Your Music Tastes</p>
      <a href={LOGIN_URL_PARAMS}> Login to Spotify</a>
    </div>
  );
};

export default HomePage;
