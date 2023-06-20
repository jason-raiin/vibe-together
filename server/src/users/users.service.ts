import { Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'core') private userModel: Model<User>) {}

  async addUpdateUser(user: User) {
    const result = await this.userModel.updateOne({ id: user.id }, user);
    return result;
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ id: id }, { _id: 0, __v: 0 });
    return { user };
  }
}
