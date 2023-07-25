import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { joinRoom } from '../query/rooms';
import { addUpdateUser } from '../query/users';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';

export default function CallbackRedirect({ setAccessToken }) {
  const navigate = useNavigate();

  const [userState, setUserState] = useState({});
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const tempRoom = localStorage.getItem('roomId');
  localStorage.removeItem('roomId');
  const isRoom = typeof tempRoom === 'string';
  // console.log('Code: ', code);

  useEffect(() => {
    getAccessToken(code)
      .then((accessToken) => {
        setAccessToken(accessToken);
        // console.log(accessToken);
        return getUserFromSpotify(accessToken);
      })
      .then((user) => {
        setUserState(user);
        return addUpdateUser(user);
      })
      .then((stuff) => {
        // console.log(stuff);
        if (!stuff) {
          navigate('/whitelist');
        } else {
          if (isRoom) {
            try {
              joinRoom(userState.id, tempRoom);
              navigate(`/room?id=${tempRoom}`);
            } catch (error) {
              console.error(error);
            }
          }
          navigate('/');
        }
      });
  }, []);

  return <div></div>;
}
