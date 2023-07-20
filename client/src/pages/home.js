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
        className="standard-outer-window"
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
        <Stack spacing={0} sx={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: '1vh' }}>
            <div
              style={{
                height: '2.5vh',
                width: '2.5vh',
                border: '0.5vh solid #97b690',
                borderRadius: '2.5vh',
                backgroundColor: '#ee5250',
              }}
            />
            <div
              style={{
                height: '2.5vh',
                width: '2.5vh',
                border: '0.5vh solid #97b690',
                borderRadius: '2.5vh',
                backgroundColor: '#5cfcf4',
              }}
            />
            <div
              style={{
                height: '2.5vh',
                width: '2.5vh',
                border: '0.5vh solid #97b690',
                borderRadius: '2.5vh',
                backgroundColor: '#fff69d',
              }}
            />
          </div>
          <div
            className="standard-inner-window"
            style={{
              display: 'flex',
              height: '30vh',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Stack spacing={2} alignItems="center" justifyContent="center">
              <h1>Connect and Compare Your Music Tastes Today</h1>
              <LoginButton />
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default HomePage;
