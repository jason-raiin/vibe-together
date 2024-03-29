import { Injectable } from '@nestjs/common';
import { AudioFeatures } from 'src/dtos/features.dto';
import { Genre } from 'src/dtos/genre.dto';
import { Item, Artist, Track } from 'src/dtos/item.dto';
import { SpotifyService } from 'src/spotify/spotify.service';
import { User } from 'src/users/users.schema';
import { BLANK_AUDIO_FEATURES, SCALE } from './constants';

@Injectable()
export class ComputeService {
  constructor(private spotifyService: SpotifyService) {}

  processTopGenres(topArtists: Artist[]) {
    const genres: Genre[] = [];
    for (const artist of topArtists) {
      const occurrences = artist.occurrences ? artist.occurrences : 1;
      for (const name of artist.genres) {
        const existingGenre = genres.find((genre, genreIndex) => {
          if (name === genre.name) {
            genres[genreIndex].occurrences += occurrences;
            return true;
          }
        });

        if (!existingGenre) {
          const newGenre = { name, occurrences };
          genres.push(newGenre);
        }
      }
    }

    genres.sort((a, b) => b.occurrences - a.occurrences);

    return genres;
  }

  async processTrackFeatures(topTracks: Track[]) {
    const topTrackIds = topTracks.map((track) => track.id);
    const tracksFeatures = await this.spotifyService.getTracksFeatures(
      topTrackIds,
    );

    const totalFeatures = tracksFeatures.reduce(
      (features: AudioFeatures, track) => {
        const tempFeatures = new AudioFeatures();
        for (const [feature, value] of Object.entries(features))
          tempFeatures[feature] = value + track[feature];
        return tempFeatures;
      },
      BLANK_AUDIO_FEATURES,
    );

    const averageFeatures = new AudioFeatures();
    for (const [feature, value] of Object.entries(totalFeatures)) {
      if (feature === 'loudness') {
        averageFeatures[feature] =
          (value / topTrackIds.length / 60 + 1) * SCALE;
      } else if (feature === 'tempo') {
        averageFeatures[feature] = (value / topTrackIds.length / 250) * SCALE;
      } else {
        averageFeatures[feature] = (value / topTrackIds.length) * SCALE;
      }
    }

    return averageFeatures;
  }

  processRoomTopItems(users: User[]) {
    const artists: Artist[] = [];
    const tracks: Track[] = [];

    for (const user of users) {
      for (const [rank, userTopArtist] of user.topArtists.entries()) {
        const existingArtist = artists.find((artist, artistIndex) => {
          if (artist.id === userTopArtist.id) {
            artists[artistIndex].rank += rank - 10;
            artists[artistIndex].occurrences += 1;
            return true;
          }
        });

        if (!existingArtist) {
          userTopArtist.rank = rank;
          userTopArtist.occurrences = 1;
          artists.push(userTopArtist);
        }
      }

      for (const [rank, userTopTrack] of user.topTracks.entries()) {
        const existingTrack = tracks.find((track, trackIndex) => {
          if (track.id === userTopTrack.id) {
            tracks[trackIndex].rank += rank - 10;
            tracks[trackIndex].occurrences += 1;
            return true;
          }
        });

        if (!existingTrack) {
          userTopTrack.rank = rank;
          userTopTrack.occurrences = 1;
          tracks.push(userTopTrack);
        }
      }
    }

    const sortTop = (x: Item, y: Item) =>
      x.occurrences - y.occurrences === 0
        ? x.rank - y.rank
        : y.occurrences - x.occurrences;

    artists.sort(sortTop);
    tracks.sort(sortTop);
    const genres = this.processTopGenres(artists);

    return { artists, tracks, genres };
  }

  processRoomTrackFeatures(users: User[]) {
    const totalFeatures = users.reduce((features: AudioFeatures, user) => {
      const tempFeatures = new AudioFeatures();
      for (const [feature, value] of Object.entries(features))
        tempFeatures[feature] = value + user.trackFeatures[feature];
      return tempFeatures;
    }, BLANK_AUDIO_FEATURES);

    const averageFeatures = new AudioFeatures();
    for (const [feature, value] of Object.entries(totalFeatures))
      averageFeatures[feature] = value / users.length;

    return averageFeatures;
  }
}
