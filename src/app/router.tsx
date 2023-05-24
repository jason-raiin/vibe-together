import { useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const router = () => {
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('code');
      console.log(token);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };
    handleCallback();
  }, [navigator, location.search]);

  return <div></div>;
};

export default router;
