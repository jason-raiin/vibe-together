import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async newUser(@Body('user') user: any) {
    return await this.usersService.addUpdateUser(user);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.usersService.getUser(userId);
  }
}
