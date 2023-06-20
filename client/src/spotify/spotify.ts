import axios from 'axios';
import { AUTH_STRING, REDIRECT_URI, SPOTIFY_TOKEN_URL } from './constants';
import { User } from '../dtos/user.dto';
import { UserProfile } from '../dtos/userProfile.dto';
import { TopArtists } from '../dtos/topArtists.dto';
import { TopTracks } from '../dtos/topTracks.dto';

export const getAccessToken = async (code: string): Promise<string> => {
  console.log(AUTH_STRING);
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
    console.error('Failed to get access token:');
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
    console.error('Failed to refresh access token:');
  }

  return '';
};

export const isValidAccessToken = async (
  accessToken: string,
): Promise<boolean> => {
  try {
    const testUrl = 'https://api.spotify.com/v1/me';
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(testUrl, config);
    if (response.status === 200) return true;
  } catch (error) {
    console.error('Access token is invalid:', error);
  }

  return false;
};

export const getUser = async (accessToken: string): Promise<User> => {
  try {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    const userProfileUrl = `https://api.spotify.com/v1/me/`;
    const userProfileResponse = await axios.get(userProfileUrl, config);
    const userProfile = userProfileResponse.data;

    const topArtistsUrl = `https://api.spotify.com/v1/me/top/artists`;
    const topArtistsResponse = await axios.get(topArtistsUrl, config);
    const topArtists = topArtistsResponse.data;

    const topTracksUrl = `https://api.spotify.com/v1/me/top/tracks`;
    const topTracksResponse = await axios.get(topTracksUrl, config);
    const topTracks = topTracksResponse.data;

    const user = { userProfile, topArtists, topTracks };
    return user;
  } catch (e) {
    console.error(e);
  }

  return {
    userProfile: {} as UserProfile,
    topArtists: {} as TopArtists,
    topTracks: {} as TopTracks,
  };
};
