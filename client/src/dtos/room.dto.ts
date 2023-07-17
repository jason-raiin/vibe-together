import { AudioFeatures } from './features.dto';
import { Genre } from './genre.dto';
import { Item } from './item.dto';

export interface Room {
  id: string;
  name: string;
  users: string[];
  topArtists: Item[];
  topTracks: Item[];
  topGenres?: Genre[];
  trackFeatures?: AudioFeatures;
}
