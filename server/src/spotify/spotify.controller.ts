import { Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/profile/:id')
  async getProfile(@Param('id') id: string) {
    return await this.spotifyService.getUser(id);
  }

  @Get('/artist/:id')
  async getArtist(@Param('id') id: string) {
    return await this.spotifyService.getArtist(id);
  }

  @Post('/usertoken')
  async getAccessToken(@Headers('code') code: string) {
    return await this.spotifyService.getUserAccessToken(code);
  }

  @Get('/me')
  async getCurrentUser(@Headers('access_token') accessToken: string) {
    return await this.spotifyService.getCurrentUser(accessToken);
  }

  @Get('/me/top/artists')
  async getCurrentUserTopArtists(@Headers('access_token') accessToken: string) {
    return await this.spotifyService.getCurrentUserTopArtists(accessToken);
  }
}
