import React from 'react';
import Box from '@mui/material/Box';
import { LogoutButton } from './button';

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
          <h1>VibeTogether</h1>
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
