"use client"
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('code');
      console.log(token);
      await new Promise((resolve) => setTimeout(resolve, 2000));

    };
    handleCallback();
  }, [navigate, location.search]);

  return (
    <div>
    </div>
  );
};

export default MyComponent;