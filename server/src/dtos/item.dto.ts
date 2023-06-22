import { Url } from 'url';

export class Item {
  name: string;
  id: string;
  href: Url;
  rank?: number;
  shared?: number;
}
