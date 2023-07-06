import React from 'react';
import Box from '@mui/material/Box';
import { LogoutButton } from './button';
import { Link } from '@mui/material';
import { APP_URI } from './constants';

export default function Header({ loggedIn, setAccessToken }) {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
  };

  return (
    <Box fontFamily="sans-serif">
      <Box display="flex" justifyContent="space-between">
        <Box paddingLeft="3%" display="flex" justifyContent="left">
          <Link href={APP_URI} color="black" underline="none">
            <h1>VibeTogether</h1>
          </Link>
        </Box>
        {loggedIn && (
          <Box m={2} display="flex" justifyContent="right">
            <LogoutButton logout={logout} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
