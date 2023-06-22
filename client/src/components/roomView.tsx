import React, { useEffect, useState } from 'react';
import { getRoomsByUser, getUser } from '../query/users';
import Button from '@mui/material/Button';
import { Room } from '../dtos/room.dto';

interface ChildComponentProps {
  roomList: Room[];
}

const roomView: React.FC<ChildComponentProps> = (props) => {
  const { roomList } = props;

  const roomButtonList = roomList?.map((room) => {
    const [view, setView] = useState(false);

    const roomUserList = room?.users.map((userid) => {
      try {
        const containerFunction = async () => {
          const user = await getUser(userid);

          return (
            <li key={userid}>
              <a href={user.url}>{user.displayName}</a>
            </li>
          );
        };

        containerFunction();
      } catch (error) {
        console.error(error);
        return <div></div>;
      }
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

    const expandView = () => {
      setView(true);
    };

    return (
      <div key={room.id}>
        <Button
          variant="contained"
          onClick={expandView}
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

  return (
    <div>
      <h1>Rooms</h1>
      {roomButtonList}
    </div>
  );
};

export default roomView;
