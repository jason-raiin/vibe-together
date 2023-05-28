import axios from 'axios';
import { AUTH_STRING, REDIRECT_URI } from './constants';

//TODO: OOP-ify the functions
//TODO: add functions to retrieve historical user data
//TODO: implement database retrieval and addition methods
//TODO: constant list could be expanded

export class SpotifyService {
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
            Authorization: `Basic ${AUTH_STRING}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, token_type, scope, refresh_token } = response.data;

      console.log(access_token);
      console.log(refresh_token);
      console.log(token_type);
      console.log(scope);

      return access_token;
    } catch (error) {
      console.error('Failed to get access token:');
    }
  }

  async getUserProfile(accessToken: string) {
    try {
      console.log('accessToken:', accessToken);
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
