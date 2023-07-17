import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComputeService } from 'src/compute/compute.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'core') private userModel: Model<User>,

    private computeService: ComputeService,
  ) {}

  async addUpdateUser(user: User): Promise<User> {
    if (!user) throw new BadRequestException('No user provided');

    user.topGenres = this.computeService.processTopGenres(user.topArtists);
    user.trackFeatures = await this.computeService.processTrackFeatures(
      user.topTracks,
    );
    const result = await this.userModel.updateOne({ id: user.id }, user);

    if (result.matchedCount === 0) {
      const newUser = new this.userModel(user);
      return await newUser.save();
    }
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id: id }, { _id: 0, __v: 0 });
    if (!user) throw new BadRequestException('No such user');

    return user;
  }
}
