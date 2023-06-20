import { Url } from 'url';
import { Item } from './item.dto';

export interface TopTracks {
  href: Url;
  limit: number;
  offset: number;
  next: Url;
  previous: Url;
  items: Item[];
}
