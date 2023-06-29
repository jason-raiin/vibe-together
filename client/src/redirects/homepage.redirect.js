import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { joinRoom } from '../query/rooms';
import { addUpdateUser } from '../query/users';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';

export const HomePageRedirect = (props) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // console.log('Code: ', code);

  useEffect(() => {
    getAccessToken(code)
      .then((accessToken) => getUserFromSpotify(accessToken))
      .then((user) => addUpdateUser(user))
      .then(() => props.login())
      .then(() => navigate('/'));
  }, []);

  return <div></div>;
};
