import React from 'react';
import { SpotifyService } from './spotify.service';

export class LoginService {
  async isValidUser(accessToken: string, refreshToken: string) {
    const spotifyservice = new SpotifyService();
    const result = await spotifyservice.isValidAccessToken(accessToken);
    if (!result) {
      const newaccessToken = await spotifyservice.refreshAccessToken(
        refreshToken,
      );
      const newresult = await spotifyservice.isValidAccessToken(newaccessToken);
      return newresult;
    }
    return result;
  }
}
