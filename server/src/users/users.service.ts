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

  async createNewUser(user: UserDocument) {
    const existingUser = await this.userModel.findOne({ id: user.id });
    if (existingUser) throw new BadRequestException('User already exists!');

    const newUser = new this.userModel(user);
    if (!newUser)
      throw new ServiceUnavailableException('Write to database failed!');
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ id: id }, { _id: 0, __v: 0 });
    if (!user) throw new BadRequestException('No such user!');

    return user;
  }
}
