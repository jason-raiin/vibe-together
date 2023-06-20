import { TopArtists } from './topArtists.dto';
import { TopTracks } from './topTracks.dto';
import { UserProfile } from './userProfile.dto';

export interface User {
  userProfile: UserProfile;
  topArtists: TopArtists;
  topTracks: TopTracks;
}
