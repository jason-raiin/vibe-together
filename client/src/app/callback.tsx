import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';
import { addUpdateUser } from '../query/users';

const CallBack: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    getAccessToken(code)
      .then((accessToken) => getUserFromSpotify(accessToken))
      .then((user) => addUpdateUser(user))
      .then(() => navigate('/'))
      .catch((e) => console.error(e));
  }, []);

  return <div></div>;
};

export default CallBack;
