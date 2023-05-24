import React from 'react';
import { LOGIN_URL_PARAMS } from '../spotify/constants';

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
