import React, { useEffect, useState } from 'react';
import { User } from '../dtos/user.dto';
import JoinRoomButton from '../components_old/joinRoomButton';
import UserView from '../components_old/userView';
import RoomView from '../components_old/roomView';
import { getRoomsByUser } from '../query/users';
import { Room } from '../dtos/room.dto';
import Button from '@mui/material/Button';

interface ChildComponentProps {
  user: User;
}

const AuthDefault: React.FC<ChildComponentProps> = (props) => {
  const { user } = props;
  const [roomList, setRoomList] = useState({} as Room[]);
  const [userViewStatus, setUserViewStatus] = useState(false);
  const [roomViewStatus, setRoomViewStatus] = useState(false);
  const [displayRoom, setDisplayRoom] = useState(false);
  useEffect(() => {
    const containerFunction = async () => {
      if (user?.topArtists?.length > 0) {
        setUserViewStatus(true);
      }
      if (user.id != null) {
        const rooms = await getRoomsByUser(user.id);
        if (rooms.length != 0) {
          setRoomViewStatus(true);
          setRoomList(rooms);
        }
      }
    };
    containerFunction();
  });

  const toggleRoomView = () => {
    if (displayRoom) {
      setDisplayRoom(false);
    } else {
      setDisplayRoom(true);
    }
  };

  return (
    <div>
      {userViewStatus ? <UserView user={user} /> : <div>No Data Found</div>}
      <Button variant="contained" onClick={toggleRoomView} title="Show Rooms">
        Rooms
      </Button>
      {displayRoom ? (
        <div>
          {roomViewStatus ? (
            <RoomView roomList={roomList} />
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <JoinRoomButton userId={user?.id} />
    </div>
  );
};

export default AuthDefault;
