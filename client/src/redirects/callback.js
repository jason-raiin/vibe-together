import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JOIN_CODE_URI } from '../components/constants';
import { joinRoom } from '../query/rooms';
import { addUpdateUser } from '../query/users';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';

export default function CallbackRedirect({ setAccessToken }) {
  const navigate = useNavigate();

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
        return addUpdateUser(user);
      })
      .then((stuff) => {
        if (!stuff) {
          navigate('/whitelist');
        }
        if (isRoom) {
          navigate(`${JOIN_CODE_URI}${tempRoom}`);
        } else {
          navigate('/');
        }
      });
  }, []);

  return <div></div>;
}
