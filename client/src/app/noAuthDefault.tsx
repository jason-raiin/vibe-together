import React from 'react';
import { LOGIN_URL_PARAMS1, LOGIN_URL_PARAMS2 } from '../spotify/constants';
import JoinRoomButton from '../components/joinRoomButton';
import Button from '@mui/material/Button';

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
      <Button
        variant="contained"
        href={`${LOGIN_URL_PARAMS1}${LOGIN_URL_PARAMS2}`}
      >
        Login to Spotify
      </Button>
      <JoinRoomButton userId={'broken'} />
    </div>
  );
};

export default NoAuthDefault;
