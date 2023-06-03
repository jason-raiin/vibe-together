import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  SPOTIFY_API_PATHS,
  SPOTIFY_API_URL,
  SPOTIFY_TOKEN_URL,
} from './spotify.constants';

@Injectable()
export class SpotifyService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly AUTH_STRING: string;
  private readonly REDIRECT_URI: string;

  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.get('CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get('CLIENT_SECRET');
    this.AUTH_STRING = Buffer.from(
      `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
    ).toString('base64');
    this.REDIRECT_URI = this.configService.get('REDIRECT_URI');
  }

  // spotify queries

  async getClientAccessToken() {
    try {
      const url = SPOTIFY_TOKEN_URL;
      const payload = {
        grant_type: 'client_credentials',
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
      };
      const headers = {
        Authorization: `Basic ${this.AUTH_STRING}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const response = await axios.post(url, payload, { headers });
      const { access_token } = response.data;

      return access_token;
    } catch (e) {
      console.error(e);
    }
  }

  async getUser(id: string) {
    try {
      const accessToken = await this.getClientAccessToken();
      const url = `${SPOTIFY_API_URL}users/${id}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const response = await axios.get(url, { headers });
      const profile = response.data;

      return profile;
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async getArtist(id: string) {
    const accessToken = await this.getClientAccessToken();
    const url = `${SPOTIFY_API_URL}artists/${id}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await axios.get(url, { headers });
    const profile = response.data;

    return profile;
  }

  // user queries

  async getUserAccessToken(code: string) {
    try {
      const url = SPOTIFY_TOKEN_URL;
      const payload = {
        code: code,
        redirect_uri: this.REDIRECT_URI,
        grant_type: 'authorization_code',
      };
      const headers = {
        Authorization: `Basic ${this.AUTH_STRING}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const response = await axios.post(url, payload, { headers });
      const { access_token, refresh_token, expires_in } = response.data;

      return { access_token, refresh_token, expires_in };
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async userQuery(path: string, accessToken: string) {
    try {
      const url = `${SPOTIFY_API_URL}${path}`;
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(url, { headers });

      return response.data;
    } catch (e) {
      console.error(e.response.data);
    }
  }

  async getCurrentUser(accessToken: string) {
    return await this.userQuery(SPOTIFY_API_PATHS.me, accessToken);
  }

  async getCurrentUserTopArtists(accessToken: string) {
    return await this.userQuery(SPOTIFY_API_PATHS.topArtists, accessToken);
  }
}
