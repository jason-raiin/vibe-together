import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'core') private userModel: Model<User>) {}

  async newUser(user: UserDocument) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async getTopArtistsByUser(id: string) {
    const topArtists = await this.userModel.findOne(
      { id: id },
      { topArtists: 1 },
    );

    return topArtists;
  }
}
