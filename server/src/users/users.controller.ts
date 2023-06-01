import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDocument } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new')
  async newUser(@Body('user') user: UserDocument) {
    return await this.usersService.newUser(user);
  }

  @Get('/:id/topArtists')
  async getTopArtists(@Param('id') id: string) {
    return await this.usersService.getTopArtistsByUser(id);
  }
}
