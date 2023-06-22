import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { joinRoom } from '../query/rooms';

const LoggedInJoinRoom: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');
  const userId = searchParams.get('user');

  useEffect(() => {
    const joinRoomEffect = async () => {
      try {
        if (roomId != null && userId != null) {
          await joinRoom(userId, roomId);
        }
      } catch (error) {}
    };

    joinRoomEffect();
    const navigate = useNavigate();
    navigate('/');
  }, []);

  return <div></div>;
};

export default LoggedInJoinRoom;
