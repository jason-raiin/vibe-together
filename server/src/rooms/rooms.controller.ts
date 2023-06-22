import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch('join')
  async addNewUserToRoom(
    @Body('userId') userId: string,
    @Body('roomId') roomId: string,
  ) {
    return await this.roomsService.addNewUserToRoom(roomId, userId);
  }

  @Patch('joinable')
  async isRoomJoinable(
    @Body('userId') userId: string,
    @Body('roomId') roomId: string,
  ) {
    return await this.roomsService.isRoomJoinable(roomId, userId);
  }

  @Get('/:roomId')
  async getRoom(@Param('roomId') roomId: string) {
    return await this.roomsService.getRoom(roomId);
  }

  @Get('/:roomId/details')
  async getUsersInRoom(@Param('roomId') roomId: string) {
    return await this.roomsService.getRoomUserDetails(roomId);
  }

  @Get('/all/:userId')
  async getRoomsByUser(@Param('userId') userId: string) {
    return await this.roomsService.getRoomsByUser(userId);
  }
}
