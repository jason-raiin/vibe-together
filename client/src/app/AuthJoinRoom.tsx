import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { joinRoom } from '../query/rooms';
import { User } from '../dtos/user.dto';

interface ChildComponentProps {
  user: User;
}

const AuthJoinRoom: React.FC<ChildComponentProps> = (props) => {
  const { user } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get('room');
  console.log(user.id, roomId);
  try {
    if (roomId != null && user.id != null) {
      joinRoom(user.id, roomId);
      navigate('/');
    }
  } catch (error) {
    console.error(error);
  }

  return <div></div>;
};

export default AuthJoinRoom;