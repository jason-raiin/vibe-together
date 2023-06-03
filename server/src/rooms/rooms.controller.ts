import { Body, Controller, Patch, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('room')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('new')
  async createNewRoom(
    @Body('userId') userId: string,
    @Body('name') name: string,
  ) {
    return await this.roomsService.createNewRoom(userId, name);
  }

  @Patch('add')
  async addNewUserToRoom(
    @Body('userId') userId: string,
    @Body('roomId') roomId: string,
  ) {
    return await this.roomsService.addNewUserByRoom(roomId, userId);
  }
}
