import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { joinRoom } from '../query/rooms';
import { addUpdateUser } from '../query/users';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';

const CallBack: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const tempRoom = localStorage.getItem('roomId');
  localStorage.removeItem('roomId');
  const isRoom = typeof tempRoom === 'string';
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    getAccessToken(code)
      .then((accessToken) => getUserFromSpotify(accessToken))
      .then((user) => {
        addUpdateUser(user);
        console.log(user);
        if (isRoom) {
          console.log('joining room');
          try {
            joinRoom(user.id, tempRoom);
          } catch (error) {
            console.error(error);
          }
        }
      })
      .then(() => {
        if (isRoom) {
          navigate('/');
        } else {
          navigate('/');
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return <div></div>;
};

export default CallBack;
