import React from 'react';
import { User } from '../dtos/user.dto';

interface ChildComponentProps {
  user: User;
}

const userView: React.FC<ChildComponentProps> = (props) => {
  const { user } = props;

  const artistList = user?.topArtists?.map((artist) => {
    return (
      <li key={artist.name}>
        <a href={artist.url}>{artist.name}</a>: {artist.id}
      </li>
    );
  });

  const trackList = user?.topTracks?.map((track) => {
    return (
      <li key={track.name}>
        <a href={track.url}>{track.name}</a>: {track.id}
      </li>
    );
  });

  return (
    <div>
      <h1>
        User Profile for <a href={user?.url}>{user?.displayName}</a>
      </h1>
      <ol>Artists: {artistList}</ol>
      <ol>Tracks: {trackList}</ol>
    </div>
  );
};

export default userView;
