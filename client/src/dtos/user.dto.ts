import { Item } from './item.dto';

export interface User {
  id: string;
  displayName: string;
  url: string;
  images: [];
  topArtists: Item[];
  topTracks: Item[];
}
