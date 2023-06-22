import React, { useEffect, useState } from 'react';
import { isValidAccessToken } from '../spotify/spotify';
import { getUser } from '../query/users';
import { User } from '../dtos/user.dto';
import JoinRoomButton from '../components/joinroombutton';

interface ChildComponentProps {
  user: User;
}

const AuthUserView: React.FC<ChildComponentProps> = (props) => {
  const { user } = props;

  const artistList = user?.topArtists?.map((artist) => {
    return (
      <li key={artist.name}>
        {artist.name} : {artist.id}
      </li>
    );
  });

  const trackList = user?.topTracks?.map((track) => {
    return (
      <li key={track.name}>
        {track.name} : {track.id}
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
      <JoinRoomButton userId={user?.id} />
    </div>
  );
};

export default AuthUserView;
