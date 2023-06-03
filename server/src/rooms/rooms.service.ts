import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/users.schema';
import { Room } from './rooms.schema';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @InjectModel(Room.name, 'core') private roomModel: Model<Room>,
    @InjectModel(User.name, 'core') private userModel: Model<User>,
  ) {}

  async createNewRoom(userId: string, name: string) {
    const id = randomBytes(16).toString('hex');
    const newRoom = new this.roomModel({ id, name });

    const user = await this.userModel.findOne({ id: userId });
    if (!user) throw new BadRequestException('No such user!');
    newRoom.users.push(userId);

    const result = await newRoom.save();
    if (!result)
      throw new ServiceUnavailableException('Write to database failed!');
  }

  async addNewUserByRoom(roomId: string, userId: string) {
    const room = await this.roomModel.findOne({ id: roomId });
    if (!room) throw new BadRequestException('No such room!');

    const user = await this.userModel.findOne({ id: userId });
    if (!user) throw new BadRequestException('No such user!');

    if (room.users.includes(userId))
      throw new BadRequestException('User is already in!');
    room.users.push(userId);

    const result = await room.save();
    if (!result)
      throw new ServiceUnavailableException('Write to database failed!');
  }
}
