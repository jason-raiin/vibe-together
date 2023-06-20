import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../spotify/spotify';

const CallBack: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  if (!code) throw new Error('no code');

  useEffect(() => {
    getAccessToken(code)
      .then(() => navigate('/'))
      .catch((e) => console.error(e));
  }, []);

  return <div>not working</div>;
};

export default CallBack;
