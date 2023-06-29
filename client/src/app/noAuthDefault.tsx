import Button from '@mui/material/Button';
import React from 'react';
import JoinRoomButton from '../components_old/joinRoomButton';
import { LOGIN_URL_PARAMS } from '../spotify/constants';

interface ChildComponentProps {
  refreshLoginStatus: () => void;
}

const NoAuthDefault: React.FC<ChildComponentProps> = ({
  refreshLoginStatus,
}) => {
  refreshLoginStatus();
  return (
    <div>
      <h1>Music Room</h1>
      <p>Connect and Compare Your Music Tastes</p>
      <Button variant="contained" href={`${LOGIN_URL_PARAMS}`}>
        Login to Spotify
      </Button>
      <JoinRoomButton userId={'broken'} />
    </div>
  );
};

export default NoAuthDefault;
