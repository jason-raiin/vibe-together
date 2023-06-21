import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { joinRoomQuery } from '../query/rooms';

const LoggedInJoinRoom: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('room');
  const userId = searchParams.get('user');

  useEffect(() => {
    const joinRoom = async () => {
      try {
        if (roomId != null && userId != null) {
          await joinRoomQuery(userId, roomId);
        }
      } catch (error) {}
    };

    joinRoom();
    const navigate = useNavigate();
    navigate('/');
  }, []);

  return <div></div>;
};

export default LoggedInJoinRoom;
