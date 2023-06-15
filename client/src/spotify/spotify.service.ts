import axios from 'axios';
import { BACKEND_PATHS, BACKEND_URI } from './constants';

export class SpotifyService {
  constructor() {
    if (!BACKEND_URI) throw new Error('No backend URL provided');
  }

  async getAccessToken(code: string) {
    try {
      const url = `${BACKEND_URI}${BACKEND_PATHS.userToken}`;
      const headers = { code };

      console.log(url);

      const response = await axios.get(url, { headers });
      if (!response.data.access_token) throw new Error('no access token');
      console.log(response.data.access_token);

      localStorage.setItem('accessToken', response.data.access_token);

      return response.data.access_token;
    } catch (e) {
      console.error(e);
    }
  }

  isValidAccessToken = async (code: string) => {
    try {
      const url = `${BACKEND_URI}${BACKEND_PATHS.userToken}`;
      const headers = { code };

      console.log(url);

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error('Access token is invalid:', error);
    }

    return false;
  };

  async getUserProfile(accessToken: string) {
    try {
      const url = `${BACKEND_URI}${BACKEND_PATHS.me}`;
      const headers = { accessToken };

      const response = await axios.get(url, { headers });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserTopArtists(accessToken: string) {
    try {
      const url = `${BACKEND_URI}${BACKEND_PATHS.topArtists}`;
      const headers = { accessToken };

      const response = await axios.get(url, { headers });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}
