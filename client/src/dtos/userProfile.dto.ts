import { Image } from './image.dto';

export interface UserProfile {
  display_name: string | null;
  id: string;
  images: Image[];
  uri: string;
}
