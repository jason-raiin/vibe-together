import React from 'react';
import { useSearchParams } from 'react-router-dom';

const CallBack = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  return (
    <div>
      <h1>User</h1>
      <p>Code: {code}</p>
    </div>
  );
};

export default CallBack;
