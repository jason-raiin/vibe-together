import React from 'react';

const ArtistList = (props) => {
  const artistList = props.artists?.slice(0, 10).map((artist) => {
    return (
      <li key={artist.id}>
        <a href={artist.url}>{artist.name}</a>
      </li>
    );
  });

  return (
    <div>
      <ol>{artistList}</ol>
    </div>
  );
};

export default ArtistList;
