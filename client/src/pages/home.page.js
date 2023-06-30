import Button from '@mui/material/Button';
import React from 'react';
import './styles.css';
import { LoginButton } from '../components/button.component';

const HomePage = () => {
  return (
    <div className="standard">
      <h1>Music Room</h1>
      <p>Connect and Compare Your Music Tastes</p>
      <LoginButton />
    </div>
  );
};

export default HomePage;
