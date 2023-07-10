import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';
import { LoginButton } from '../components/button';
import './styles.css';

const HomePage = () => {
  return (
    <>
      <div
        className="standard"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
        }}
      >
        {/*
      <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
      >*/}
        <Box
          alignItems="center"
          justifyContent="center"
          border={3}
          borderColor="#011D3F55"
          sx={{
            backgroundColor: '#21368555',
            paddingTop: 2,
            paddingBottom: 3,
            borderRadius: 3,
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <Stack spacing={2}>
            <p>Connect and Compare Your Music Tastes Today</p>
            <LoginButton />
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default HomePage;
