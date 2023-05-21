import Image from 'next/image'
const axios = require('axios');
require('dotenv').config();

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MyComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('code');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (token) {
        navigate('/page2.tsx');
      }
    };
    handleCallback();
  }, [navigate, location.search]);

  return (
    <div>
      {"adsjadjsk"}
    </div>
  );
};


const express = require('express');
const app = express();
app.get('/callback', function(req: { query: { code: any; }; }) {
  const authorizationCode = req.query.code;
}); 

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
let accessToken = '';

async function getAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:' );
  }
}

getAccessToken();

async function getUserProfile(userId: string) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/${userId}/top/artists`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('User Profile:', response.data);
  } catch (error) {
    console.error('Failed to get user profile:');
  }
}

getUserProfile('2h4ghv0j7i8u82ggzo2t4t5rt');

const loginUrl = `https://accounts.spotify.com/authorize`;
const redirectUri = `http://localhost:3000/callback`;
const loginUrlParameters = `${loginUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-top-read`;

const HomePage = () => {
  return (
    <div>
          <h1>Music Room</h1>
          <p>Connect and Compare Your Music Tastes</p>
          <a href={loginUrlParameters}> Login to Spotify</a>

    </div>
  );
};

export default HomePage;
