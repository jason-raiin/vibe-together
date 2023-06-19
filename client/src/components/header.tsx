import React from 'react';
import Button from '@mui/material/Button';

const Header: React.FC = () => {
  function logOut(): void {
    localStorage.removeItem('accessToken');
  }

  return (
    <div>
      <Button variant="contained" onClick={logOut} title="logOut">
        Log Out
      </Button>
    </div>
  );
};

export default Header;
