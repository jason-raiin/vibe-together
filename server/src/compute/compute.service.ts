import { Injectable } from '@nestjs/common';
import { Item, Artist, Track } from 'src/dtos/item.dto';
import { UserDocument } from 'src/users/users.schema';

@Injectable()
export class ComputeService {
  async processRoomTopItems(
    usersDetails: UserDocument[],
  ): Promise<{ artists: Artist[]; tracks: Track[] }> {
    const artists: Artist[] = [];
    const tracks: Track[] = [];

    for (const user of usersDetails) {
      for (const [rank, userTopArtist] of user.topArtists.entries()) {
        const existingArtist = artists.find((artist, artistIndex) => {
          if (artist.id === userTopArtist.id) {
            artists[artistIndex].rank += rank - 10;
            artists[artistIndex].shared += 1;
            return true;
          }
        });

        if (!existingArtist) {
          userTopArtist.rank = rank;
          userTopArtist.shared = 1;
          artists.push(userTopArtist);
        }
      }

      for (const [rank, userTopTrack] of user.topTracks.entries()) {
        const existingTrack = tracks.find((track, trackIndex) => {
          if (track.id === userTopTrack.id) {
            tracks[trackIndex].rank += rank - 10;
            tracks[trackIndex].shared += 1;
            return true;
          }
        });

        if (!existingTrack) {
          userTopTrack.rank = rank;
          userTopTrack.shared = 1;
          tracks.push(userTopTrack);
        }
      }
    }

    const sortTop = (x: Item, y: Item) =>
      x.shared - y.shared === 0 ? x.rank - y.rank : y.shared - x.shared;

    artists.sort(sortTop);
    tracks.sort(sortTop);

    return { artists, tracks };
  }

  async processRoomTopGenres(topArtists: Item[]): Promise<string[]> {
    return [];
  }
}
