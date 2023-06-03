import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SPOTIFY_API_URL, SPOTIFY_TOKEN_URL } from './spotify.constants';

@Injectable()
export class SpotifyService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly AUTH_STRING: string;

  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.get('CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get('CLIENT_SECRET');
    this.AUTH_STRING = Buffer.from(
      `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
    ).toString('base64');
  }

  async getAccessToken() {
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
      console.error(e.response.data);
    }
  }

  async getProfile(id: string) {
    try {
      const accessToken = await this.getAccessToken();
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
    const accessToken = await this.getAccessToken();
    const url = `${SPOTIFY_API_URL}artists/${id}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await axios.get(url, { headers });
    const profile = response.data;

    return profile;
  }
}