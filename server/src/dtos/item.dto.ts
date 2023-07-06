export abstract class Item {
  name: string;
  id: string;
  href: string;
  url: string;
  images: [];
  rank?: number;
  occurrences?: number;
}

export class Artist extends Item {
  genres: string[];
}

export class Track extends Item {
  artists: Artist[];
  album: { images: [] };
}
