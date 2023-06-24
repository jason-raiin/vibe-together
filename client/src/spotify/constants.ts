import { Buffer } from 'buffer';

export const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const REDIRECT_URI = `${process.env.REACT_APP_URL}/callback`;
export const LOGIN_URL_PARAMS = `${SPOTIFY_LOGIN_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-top-read`;
export const AUTH_STRING = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
).toString('base64');

export const RETRIEVE_LIMIT = 50;
