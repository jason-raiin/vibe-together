import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { Room, RoomDocument } from './rooms.schema';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { Item } from 'src/dtos/item.dto';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @InjectModel(Room.name, 'core') private roomModel: Model<Room>,
    @InjectModel(User.name, 'core') private userModel: Model<User>,
  ) {}

  async createNewRoom(
    userId: string,
    name: string,
  ): Promise<{ roomId: string; name: string }> {
    if (!name) throw new BadRequestException('Name cannot be empty!');

    const roomId = randomBytes(16).toString('hex');
    const newRoom = new this.roomModel({ id: roomId, name });

    const user = await this.userModel.findOne({ id: userId });
    if (!user) throw new BadRequestException('No such user!');
    newRoom.users.push(userId);

    const result = await newRoom.save();
    if (!result)
      throw new ServiceUnavailableException('Write to database failed!');

    this.updateRoom(roomId);

    return { roomId, name };
  }

  async addNewUserToRoom(
    roomId: string,
    userId: string,
  ): Promise<RoomDocument> {
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

    const updatedRoom = this.updateRoom(roomId);
    return updatedRoom;
  }

  async getRoom(roomId: string): Promise<RoomDocument> {
    const room = await this.roomModel.findOne({ id: roomId });
    if (!room) throw new BadRequestException('No such room!');
    return room;
  }

  async getRoomsByUser(userId: string): Promise<RoomDocument[]> {
    const user = await this.roomModel.findOne({ id: userId });
    if (!user) throw new BadRequestException('No such user!');

    const rooms = await this.roomModel.find({ users: userId });
    return rooms;
  }

  async getRoomDetails(roomId: string): Promise<UserDocument[]> {
    const { users } = await this.getRoom(roomId);
    const usersDetails = await this.userModel.find({ id: { $in: users } });
    return usersDetails;
  }

  async getRoomTopArtists(usersDetails: UserDocument[]): Promise<Item[]> {
    const artists: Item[] = [];

    for (const [userIndex, user] of usersDetails.entries()) {
      for (const [rank, userTopArtist] of user.topArtists.entries()) {
        const existingArtist = artists.find((artist, artistIndex) => {
          if (artist.id === userTopArtist.id) {
            artists[artistIndex].rank += rank;
            return true;
          }
        });

        if (!existingArtist) {
          userTopArtist.rank = rank;
          artists.push();
        }
      }
    }

    artists.sort((x, y) => x.rank - y.rank);

    return artists;
  }

  async updateRoom(roomId: string): Promise<RoomDocument> {
    const room = await this.getRoom(roomId);
    const usersDetails = await this.getRoomDetails(roomId);
    room.topArtists = await this.getRoomTopArtists(usersDetails);
    room.save();

    return room;
  }
}
