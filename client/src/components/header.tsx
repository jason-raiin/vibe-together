import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ChildComponentProps {
  refreshPage: () => void;
}

const Header: React.FC<ChildComponentProps> = ({ refreshPage }) => {
  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    refreshPage();
  };

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box></Box>
        <Box>
          <h1>VibeTogether</h1>
        </Box>
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button variant="contained" onClick={logOut} title="logOut">
            Log Out
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Header;
