import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Room } from '../dtos/room.dto';

interface ChildComponentProps {
  roomList: Room[];
}

const roomView: React.FC<ChildComponentProps> = (props) => {
  const { roomList } = props;

  const roomButtonList = roomList?.map((room) => {
    const [view, setView] = useState(false);

    const toggleView = () => {
      if (view) {
        setView(false);
      } else {
        setView(true);
      }
    };

    const roomUserList = room?.users?.map((user) => {
      return <li key={user}>{user}</li>;
    });

    const roomArtistList = room?.topArtists?.map((artist) => {
      return (
        <li key={artist.name}>
          <a href={artist.url}>{artist.name}</a>: {artist.id}
        </li>
      );
    });

    const roomTrackList = room?.topTracks?.map((track) => {
      return (
        <li key={track.name}>
          <a href={track.url}>{track.name}</a>: {track.id}
        </li>
      );
    });

    return (
      <div key={room.id}>
        <Button
          variant="contained"
          onClick={toggleView}
          title="Create Room Now"
        >
          {room.name}
        </Button>
        {view ? (
          <div>
            {' '}
            <ol>Users: {roomUserList}</ol>
            <ol>Artists: {roomArtistList}</ol>
            <ol>Tracks: {roomTrackList}</ol>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  });

  return <div>{roomButtonList}</div>;
};

export default roomView;
