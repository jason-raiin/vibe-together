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
