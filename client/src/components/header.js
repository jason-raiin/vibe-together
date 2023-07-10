import { Grid, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'mui-image';
import React from 'react';
import { LogoutButton } from './button';
import { APP_URI } from './constants';

export default function Header({ loggedIn, setAccessToken }) {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
  };

  return (
    <Box fontFamily="sans-serif">
      <Grid container spacing={2}>
        <Grid item xs display="flex" />
        <Grid item display="flex" justifyItems="center" alignItems="center">
          <img src={require('../assets/blue.png')} height="100" />
          <Link href={APP_URI} color="black" underline="none"></Link>
        </Grid>
        <Grid item xs display="flex">
          {' '}
          {loggedIn && (
            <Box m={2} display="flex" justifyContent="right">
              <LogoutButton logout={logout} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
