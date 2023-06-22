import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'core') private userModel: Model<User>) {}

  async addUpdateUser(user: User): Promise<User> {
    if (!user) throw new BadRequestException('No user provided');

    const result = await this.userModel.updateOne({ id: user.id }, user);

    if (result.matchedCount === 0) {
      const newUser = new this.userModel(user);
      return await newUser.save();
    }
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ id: id }, { _id: 0, __v: 0 });
    if (!user) throw new BadRequestException('No such user');

    return { user };
  }
}
