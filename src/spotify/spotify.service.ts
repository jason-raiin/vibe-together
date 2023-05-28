import axios from 'axios';
import { AUTH_STRING, REDIRECT_URI, TOKEN_URL } from './constants';

//TODO: OOP-ify the functions
//TODO: add functions to retrieve historical user data
//TODO: implement database retrieval and addition methods
//TODO: constant list could be expanded

export class SpotifyService {
  async getAccessToken(code: string) {
    try {
      const payload = {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      };
      const response = await axios.post(TOKEN_URL, payload, {
        headers: {
          Authorization: `Basic ${AUTH_STRING}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token, expires_in } = response.data;

      console.log('Access Token: ', access_token);
      console.log('Refresh Token: ', refresh_token);
      console.log('Expires In: ', expires_in);

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
      const response = await axios.post(TOKEN_URL, payload, {
        headers: {
          Authorization: `Basic ${AUTH_STRING}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token, expires_in } = response.data;

      console.log('Access Token: ', access_token);
      console.log('Refresh Token: ', refresh_token);
      console.log('Expires In: ', expires_in);

      return access_token;
    } catch (error) {
      console.error('Failed to refresh access token:');
    }
  }

  async getUserProfile(accessToken: string) {
    try {
      console.log('Access Token: ', accessToken);
      const url = `https://api.spotify.com/v1/me/top/artists`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('User Profile:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:');
    }
  }
}
