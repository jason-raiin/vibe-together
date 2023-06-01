import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('new')
  async createNewRoom(@Body('userId') userId: string) {
    return await this.roomsService.createNewRoom(userId);
  }

  @Post('add')
  async addNewUserToRoom(
    @Body('userId') userId: string,
    @Body('roomId') roomId: string,
  ) {
    return await this.roomsService.addNewUserByRoom(roomId, userId);
  }
}
