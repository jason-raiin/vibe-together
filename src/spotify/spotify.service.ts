import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from './constants';

export const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64',
);
export let accessToken = '';

export class SpotifyService {
  async getAccessToken() {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      accessToken = response.data.access_token;
    } catch (error) {
      console.error('Failed to get access token:');
    }
  }

  async getUserProfile(userId: string) {
    try {
      const url = `https://api.spotify.com/v1/users/${userId}/top/artists`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('User Profile:', response.data);
    } catch (error) {
      console.error('Failed to get user profile:');
    }
  }
}
