import React from 'react';
const axios = require('axios');
require('dotenv').config();

import MyComponent from '../routes/router.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const express = require('express');
const app = express();
app.get('/callback', function(req: { query: { code: any; }; }) {
  const authorizationCode = req.query.code;
}); 

import getAccessToken from '../auth/auth.js';
getAccessToken();

/*
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
*/


