import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addUpdateUser } from '../query/users';
import { getAccessToken, getUserFromSpotify } from '../spotify/spotify';

export default function CallbackRedirect({ setAccessToken }) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // console.log('Code: ', code);

  useEffect(() => {
    getAccessToken(code)
      .then((accessToken) => {
        console.log(accessToken);
        return getUserFromSpotify(accessToken);
      })
      .then((user) => addUpdateUser(user))
      .then((stuff) => {
        if (!stuff) {
          navigate('/whitelist');
        } else {
          navigate('/');
        }
      });
  }, []);

  return <div></div>;
}
