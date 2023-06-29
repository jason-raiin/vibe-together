import React from 'react';

const TrackList = (props) => {
  const trackList = props.tracks?.slice(0, 10).map((track) => {
    return (
      <li key={track.id}>
        <a href={track.url}>{track.name}</a>
      </li>
    );
  });

  return (
    <div>
      <ol>{trackList}</ol>
    </div>
  );
};

export default TrackList;
