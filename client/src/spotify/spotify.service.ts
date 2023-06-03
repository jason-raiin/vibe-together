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

      return response.data.access_token;
    } catch (e) {
      console.error(e);
    }
  }

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
