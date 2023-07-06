import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/dtos/item.dto';
import { Genre } from 'src/dtos/genre.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'core') private userModel: Model<User>) {}

  async addUpdateUser(user: User): Promise<User> {
    if (!user) throw new BadRequestException('No user provided');

    user.topGenres = this.processUserTopGenres(user.topArtists);
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

  processUserTopGenres(topArtists: Artist[]) {
    const topGenresMap = new Map<string, Genre>();
    for (const artist of topArtists) {
      for (const genre of artist.genres) {
        const genreEntry = topGenresMap.get(genre);
        const occurrences = genreEntry ? genreEntry.occurrences + 1 : 1;
        topGenresMap.set(genre, { genre, occurrences });
      }
    }

    const topGenres = [...topGenresMap.values()].sort(
      (a, b) => b.occurrences - a.occurrences,
    );

    return topGenres;
  }
}
