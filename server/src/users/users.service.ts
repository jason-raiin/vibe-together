import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'core') private userModel: Model<User>) {}

  async createNewUser(user: any) {
    const newUser = new this.userModel({
      id: user.userProfile.id,
      displayName: user.userProfile.display_name,
      topArtists: user.topArtists.items,
      topTracks: user.topTracks.items,
    });

    const existingUser = await this.userModel.findOne({ id: newUser.id });
    if (existingUser) throw new BadRequestException('User already exists!');

    const result = newUser.save();
    if (!result)
      throw new ServiceUnavailableException('Write to database failed!');

    return result;
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ id: id }, { _id: 0, __v: 0 });
    return user;
  }
}
