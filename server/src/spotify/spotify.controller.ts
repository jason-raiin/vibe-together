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
}
