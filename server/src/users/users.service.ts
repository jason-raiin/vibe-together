import { Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'core') private userModel: Model<User>) {}

  async addUpdateUser(user: any) {
    const newUser = new this.userModel({
      id: user.userProfile.id,
      displayName: user.userProfile.display_name,
      images: user.userProfile.images,
      topArtists: user.topArtists.items,
      topTracks: user.topTracks.items,
    });

    const existingUser = await this.userModel.findOne({
      id: newUser.id,
    });

    if (existingUser) {
      existingUser.topArtists = newUser.topArtists;
      existingUser.topTracks = newUser.topTracks;
      return existingUser.save();
    } else {
      return newUser.save();
    }
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ id: id }, { _id: 0, __v: 0 });
    return user;
  }
}
