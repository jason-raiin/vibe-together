import axios from 'axios';
import { Buffer } from 'buffer';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './constants';

export const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64',
);

//TODO: OOP-ify the functions
//TODO: add functions to retrieve historical user data
//TODO: implement database retrieval and addition methods
//TODO: constant list could be expanded

export class SpotifyService {
  accessToken = '';
  refreshToken = '';

  async getAccessToken(code: string) {
    try {
      const payload = {
        code: `${code}`,
        redirect_uri: `${REDIRECT_URI}`,
        grant_type: 'authorization_code',
      };
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        payload,
        {
          headers: {
            Authorization: `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.accessToken = response.data.access_token;
      const tokenType = response.data.token_type;
      const scope = response.data.scope;
      this.refreshToken = response.data.refresh_token;

      console.log('accessToken:', this.accessToken);
      console.log('refreshToken:', this.refreshToken);
      console.log(scope);

      const url = `https://api.spotify.com/v1/me/top/artists`;
      const response2 = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      console.log('User Profile:', response2.data);
      return response2;
    } catch (error) {
      console.error('Failed to get access token:');
    }
  }

  async getUserProfile() {
    try {
      console.log('accessToken:', this.accessToken);
      const url = `https://api.spotify.com/v1/me/top/artists`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      console.log('User Profile:', response.data);
      return response;
    } catch (error) {
      console.error('Failed to get user profile:');
    }
  }
}
