import { CLIENT_ID, SPOTIFY_LOGIN_URL } from '../spotify/constants';

const APP_URI = process.env.REACT_APP_URL;
export const REDIRECT_URI = `${APP_URI}/callback`;
export const LOGIN_URI = `${SPOTIFY_LOGIN_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-top-read`;

export const ROOM_URI = `/room?id=`;
export const JOIN_ROOM_URI = `/join`;
export const CREATE_ROOM_URI = `/create`;
export const JOIN_CODE_URI = `/join-room?id=`;
