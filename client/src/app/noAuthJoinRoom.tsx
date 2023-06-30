import Button from '@mui/material/Button';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LOGIN_URI } from '../components/constants';

const NoAuthJoinRoom: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');
  if (roomId != null) localStorage.setItem('roomId', roomId);

  return (
    <div>
      <Button variant="contained" href={`${LOGIN_URI}`}>
        Redirect to Spotify Login
      </Button>
    </div>
  );
};

export default NoAuthJoinRoom;
