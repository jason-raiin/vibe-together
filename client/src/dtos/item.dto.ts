import { Image } from './image.dto';

export interface Item {
  name: string;
  id: string;
  href: string;
  url: string;
  images: Image[];
}

export interface Artist extends Item {
  genres: string[];
}

export interface Track extends Item {
  artists: Artist[];
}
