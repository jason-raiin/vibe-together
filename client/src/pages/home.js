import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';
import { LoginButton } from '../components/button';
import './pagestyles.css';

const HomePage = () => {
  return (
    <>
      <div
        className="standard-box"
        style={{
          display: 'flex',
          height: '30vh',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '15vh',
          marginRight: '15vh',
          marginTop: '5vh',
          marginBottom: '5vh',
        }}
      >
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <h1>Connect and Compare Your Music Tastes Today</h1>
          <LoginButton />
        </Stack>
      </div>
    </>
  );
};

export default HomePage;
