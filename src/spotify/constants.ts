export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export const LOGIN_URL = 'https://accounts.spotify.com/authorize';
export const REDIRECT_URI = 'http://localhost:3000/callback';
export const LOGIN_URL_PARAMS = `${LOGIN_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-top-read`;
