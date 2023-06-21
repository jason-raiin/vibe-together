import React from 'react';
import { LOGIN_URL_PARAMS } from '../spotify/constants';
import JoinRoom from '../components/joinroom';
import Button from '@mui/material/Button';

interface ChildComponentProps {
  refreshLoginStatus: () => void;
}

const HomePage: React.FC<ChildComponentProps> = ({ refreshLoginStatus }) => {
  refreshLoginStatus();
  return (
    <div>
      <h1>Music Room</h1>
      <p>Connect and Compare Your Music Tastes</p>
      <Button variant="contained" href={LOGIN_URL_PARAMS}>
        Login to Spotify
      </Button>
      <JoinRoom />
    </div>
  );
};

export default HomePage;
