import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';
import { addUpdateUser } from '../query/users';
import { joinRoom } from '../query/rooms';

const CallBack: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const tempRoom = searchParams.get('room');
  const isRoom = typeof tempRoom === 'string';
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    getAccessToken(code)
      .then((accessToken) => getUserFromSpotify(accessToken))
      .then((user) => {
        addUpdateUser(user);
        if (isRoom) {
          joinRoom(user.id, tempRoom);
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
