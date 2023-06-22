import React, { useEffect, useState } from 'react';
import { User } from '../dtos/user.dto';
import JoinRoomButton from '../components/joinRoomButton';
import UserView from '../components/userView';
import RoomView from '../components/roomView';
import { getRoomsByUser } from '../query/users';
import { Room } from '../dtos/room.dto';

interface ChildComponentProps {
  user: User;
}

const AuthDefault: React.FC<ChildComponentProps> = (props) => {
  const { user } = props;
  const [roomList, setRoomList] = useState({} as Room[]);
  const [userViewStatus, setUserViewStatus] = useState(false);
  const [roomViewStatus, setRoomViewStatus] = useState(false);
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

  return (
    <div>
      {userViewStatus ? <UserView user={user} /> : <div>No Data Found</div>}
      <h1>Rooms</h1>
      {roomViewStatus ? (
        <RoomView roomList={roomList} />
      ) : (
        <div>No Data Found</div>
      )}
      <JoinRoomButton userId={user?.id} />
    </div>
  );
};

export default AuthDefault;
