import { Item } from './item.dto';

export interface Room {
  id: string;
  name: string;
  users: string[];
  topArtists: Item[];
  topTracks: Item[];
}
