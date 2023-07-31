import { AudioFeatures } from '../../dtos/features.dto';
import { User } from '../users.schema';

export const userStub = (): User => ({
  id: 'spotify_id',
  displayName: 'display_name',
  images: [],
  url: 'spotify_url',
  topArtists: [],
  topGenres: [],
  topTracks: [],
  trackFeatures: new AudioFeatures(),
});

export const user2Stub = (): User => ({
  id: 'spotify_id2',
  displayName: 'display_name2',
  images: [],
  url: 'spotify_url2',
  topArtists: [],
  topGenres: [],
  topTracks: [],
  trackFeatures: new AudioFeatures(),
});
