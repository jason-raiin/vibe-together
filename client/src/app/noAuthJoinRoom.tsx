import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { LOGIN_URL_PARAMS1, LOGIN_URL_PARAMS2 } from '../spotify/constants';

const NoAuthJoinRoom = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');

  console.log('not logged in');
  return (
    <div>
      <Button
        variant="contained"
        href={`${LOGIN_URL_PARAMS1}?room=${roomId}${LOGIN_URL_PARAMS2}`}
      >
        Redirect to Spotify Login
      </Button>
    </div>
  );
};

export default NoAuthJoinRoom;
