import Button from '@mui/material/Button';
import React from 'react';
import { LOGIN_URL_PARAMS } from '../spotify/constants';
import './styles.css';

export const HomePage = () => {
  return (
    <div className="Default">
      <h1>Music Room</h1>
      <p>Connect and Compare Your Music Tastes</p>
      <Button variant="contained" href={`${LOGIN_URL_PARAMS}`}>
        Login
      </Button>
    </div>
  );
};
