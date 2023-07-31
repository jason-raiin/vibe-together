import { AudioFeatures } from '../../dtos/features.dto';
import { Room } from '../rooms.schema';
import { user1Stub, user2Stub } from './user.stub';

export const roomStub = (): Room => ({
  id: '000000',
  name: 'room_name',
  users: [],
  topArtists: [],
  topTracks: [],
  topGenres: [],
  trackFeatures: new AudioFeatures(),
});

export const room1Stub = (): Room => ({
  id: '000000',
  name: 'room_name',
  users: [user1Stub().id],
  topArtists: [],
  topTracks: [],
  topGenres: [],
  trackFeatures: new AudioFeatures(),
});

export const room2Stub = (): Room => ({
  id: '000000',
  name: 'room_name',
  users: [user1Stub().id, user2Stub().id],
  topArtists: [],
  topTracks: [],
  topGenres: [],
  trackFeatures: new AudioFeatures(),
});
