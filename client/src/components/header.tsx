import React from 'react';
import Button from '@mui/material/Button';

interface ChildComponentProps {
  refreshPage: () => void;
}

const Header: React.FC<ChildComponentProps> = ({ refreshPage }) => {
  const logOut = () => {
    localStorage.removeItem('accessToken');
    refreshPage();
  };

  return (
    <div>
      <Button variant="contained" onClick={logOut} title="logOut">
        Log Out
      </Button>
    </div>
  );
};

export default Header;
