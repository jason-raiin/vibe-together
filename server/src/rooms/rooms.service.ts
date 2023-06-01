import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/users.schema';
import { Room } from './rooms.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createNewRoom(userId: string) {
    const newRoom = new this.roomModel();
    const user = await this.userModel.findOne({ id: userId });
    newRoom.users.push(user);
    return await newRoom.save();
  }

  async addNewUserByRoom(roomId: string, userId: string) {
    const room = await this.roomModel.findOne({ id: roomId });
    const user = await this.userModel.findOne({ id: userId });
    room.users.push(user);
    return await room.save();
  }
}
