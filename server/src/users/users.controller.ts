import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDocument } from './users.schema';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new')
  async newUser(@Body('user') user: any) {
    return await this.usersService.createNewUser(user);
  }

  @Get('/:id')
  async getTopArtists(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
}
