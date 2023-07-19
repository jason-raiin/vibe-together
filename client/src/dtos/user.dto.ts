import { AudioFeatures } from './features.dto';
import { Genre } from './genre.dto';
import { Item } from './item.dto';

export interface User {
  id: string;
  displayName: string;
  url: string;
  images: [];
  topArtists: Item[];
  topTracks: Item[];
  topGenres?: Genre[];
  trackFeatures?: AudioFeatures;
}
