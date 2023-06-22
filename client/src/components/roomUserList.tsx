import React, { useEffect } from 'react';
import { Room } from '../dtos/room.dto';
import { getUser } from '../query/users';

/* FUCK THIS SHIT DEPRECATED DONT DELETE YET*/
/*
interface ChildComponentProps {
  room: Room;
}

const RoomUserList: React.FC<ChildComponentProps> = (props) => {
  const { room } = props;
  let roomUserList;

  useEffect(() => {
    const containerFunction = async () => {
      if (room?.users) {
        console.log('hi');
        const userPromises = room.users.map((userid) => getUser(userid));
        const userData = await Promise.all(userPromises);
        console.log('hi');
        console.log(userData);
        const roomUserList = userData.map((user) => {
          return (
            <li key={user.id}>
              <a href={user.url}>{user.displayName}</a>
            </li>
          );
        });
      } else {
        const roomUserList = <div></div>;
      }

      containerFunction();
    };
  });

  return <ol>{roomUserList}</ol>;
};

export default RoomUserList;
*/
