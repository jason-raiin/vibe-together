import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/users.schema';
import { Room, RoomDocument } from './rooms.schema';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { ComputeService } from 'src/compute/compute.service';
import { UsersService } from 'src/users/users.service';
import { ARRAY_LIMIT } from './room.constants';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @InjectModel(Room.name, 'core') private roomModel: Model<Room>,

    private userService: UsersService,
    private computeService: ComputeService,
  ) {}

  async createNewRoom(userId: string, name: string): Promise<Room> {
    if (!name) throw new BadRequestException('Name cannot be empty!');

    const roomId = randomBytes(3).toString('hex').toUpperCase();
    const newRoom = new this.roomModel({ id: roomId, name });

    const user = await this.userService.getUser(userId);
    if (!user) throw new BadRequestException('No such user!');
    newRoom.users.push(userId);

    const result = await newRoom.save();
    if (!result)
      throw new ServiceUnavailableException('Write to database failed!');

    return await this.updateRoom(roomId);
  }

  async addNewUserToRoom(
    roomId: string,
    userId: string,
  ): Promise<RoomDocument> {
    const room = await this.roomModel.findOne({ id: roomId });
    if (!room) throw new BadRequestException('No such room!');

    const user = await this.userService.getUser(userId);
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
    const user = await this.userService.getUser(userId);
    if (!user) throw new BadRequestException('No such user!');

    const rooms = await this.roomModel.find({ users: userId });
    return rooms;
  }

  async getRoomUserDetails(roomId: string): Promise<UserDocument[]> {
    const { users } = await this.getRoom(roomId);
    const usersDetails = [];

    for (const user of users) {
      const userDetails = await this.userService.getUser(user);
      usersDetails.push(userDetails);
    }

    return usersDetails;
  }

  async updateRoom(roomId: string): Promise<RoomDocument> {
    const room = await this.getRoom(roomId);
    const usersDetails = await this.getRoomUserDetails(roomId);
    const { artists, tracks, genres } =
      this.computeService.processRoomTopItems(usersDetails);
    const trackFeatures =
      this.computeService.processRoomTrackFeatures(usersDetails);

    const topArtists = artists.slice(0, ARRAY_LIMIT);
    const topTracks = tracks.slice(0, ARRAY_LIMIT);
    const topGenres = genres.slice(0, ARRAY_LIMIT);

    room.topArtists = topArtists;
    room.topTracks = topTracks;
    room.topGenres = topGenres;
    room.trackFeatures = trackFeatures;

    room.save();

    return room;
  }
}
