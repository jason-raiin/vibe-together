import axios from 'axios';
import { AUTH_STRING, REDIRECT_URI, SPOTIFY_TOKEN_URL } from './constants';
import { User } from '../dtos/user.dto';

export const getAccessToken = async (code: string): Promise<string> => {
  try {
    const payload = {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    };
    const config = {
      headers: {
        Authorization: `Basic ${AUTH_STRING}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await axios.post(SPOTIFY_TOKEN_URL, payload, config);
    const { access_token, refresh_token, expires_in } = response.data;

    /*
    console.log('Access Token: ', access_token);
    console.log('Refresh Token: ', refresh_token);
    console.log('Expires In: ', expires_in);
    */

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    return access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
  }

  return '';
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<string> => {
  try {
    const data = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };
    const config = {
      headers: {
        Authorization: `Basic ${AUTH_STRING}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await axios.post(SPOTIFY_TOKEN_URL, data, config);
    const { access_token, refresh_token, expires_in } = response.data;

    /*
    console.log('Access Token: ', access_token);
    console.log('Refresh Token: ', refresh_token);
    console.log('Expires In: ', expires_in);
    */

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    return access_token;
  } catch (error) {
    console.error('Failed to refresh access token', error);
  }

  return '';
};

export const isValidAccessToken = async (
  accessToken: string,
): Promise<{ id: string; result: boolean }> => {
  try {
    const testUrl = 'https://api.spotify.com/v1/me';
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const { data, status } = await axios.get(testUrl, config);
    if (status === 200) return { id: data.id, result: true };
  } catch (error) {
    console.error('Access token is invalid:', error);
  }

  return { id: '', result: false };
};

export const getUserFromSpotify = async (
  accessToken: string,
): Promise<User> => {
  try {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    const userProfileUrl = `https://api.spotify.com/v1/me/`;
    const userProfileResponse = await axios.get(userProfileUrl, config);
    const { id, external_urls, display_name, images } =
      userProfileResponse.data;
    const url = external_urls.spotify;

    const topArtistsUrl = `https://api.spotify.com/v1/me/top/artists`;
    const topArtistsResponse = await axios.get(topArtistsUrl, config);
    const topArtists = topArtistsResponse.data.items;

    const topTracksUrl = `https://api.spotify.com/v1/me/top/tracks`;
    const topTracksResponse = await axios.get(topTracksUrl, config);
    const topTracks = topTracksResponse.data.items;

    const user = {
      id,
      displayName: display_name,
      images,
      url,
      topArtists,
      topTracks,
    };
    return user;
  } catch (error) {
    console.error('Failed to get user:', error);
  }

  return {} as User;
};
