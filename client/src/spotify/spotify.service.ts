import axios from 'axios';
import {
  AUTH_STRING,
  BACKEND_PATHS,
  REDIRECT_URI,
  SPOTIFY_TOKEN_URL,
} from './constants';

export class SpotifyService {
  async getAccessToken(code: string) {
    console.log(AUTH_STRING);
    try {
      const payload = {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      };
      const response = await axios.post(SPOTIFY_TOKEN_URL, payload, {
        headers: {
          Authorization: `Basic ${AUTH_STRING}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token, expires_in } = response.data;

      console.log('Access Token: ', access_token);
      console.log('Refresh Token: ', refresh_token);
      console.log('Expires In: ', expires_in);

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      return access_token;
    } catch (error) {
      console.error('Failed to get access token:');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      };
      const response = await axios.post(SPOTIFY_TOKEN_URL, payload, {
        headers: {
          Authorization: `Basic ${AUTH_STRING}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token, expires_in } = response.data;

      console.log('Access Token: ', access_token);
      console.log('Refresh Token: ', refresh_token);
      console.log('Expires In: ', expires_in);

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      return access_token;
    } catch (error) {
      console.error('Failed to refresh access token:');
    }
  }

  async isValidAccessToken(accessToken: string) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error('Access token is invalid:', error);
    }

    return false;
  }

  async getUserTopArtists(accessToken: string) {
    try {
      const url = `https://api.spotify.com/v1/me/top/artists`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (e) {
      console.error('Failed to get user profile:');
    }
  }

  async getUserProfile(accessToken: string) {
    try {
      const url = `https://api.spotify.com/v1/me/`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:');
    }
  }

  async getUserTopTracks(accessToken: string) {
    try {
      console.log('Access Token: ', accessToken);
      const url = `https://api.spotify.com/v1/me/top/tracks`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:');
      return { items: [] };
    }
  }
}
