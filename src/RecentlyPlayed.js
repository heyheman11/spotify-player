import React from "react";

export const RecentlyPlayed = ({ tracks }) => {
  // artistName: item.track.album.artists[0].name,
  // albumName: item.track.album.name,
  // trackName: item.track.name,
  // albumCoverLink: item.track.album.images[1].url,
  // playedTime: item.played_at
  return (
    <div>
      {tracks.map((item, index) => (
        <div key={index}>
          <p>{item.artistName}</p>
          <p>{item.albumName}</p>
          <p>{item.trackName}</p>
          <img src={item.albumCoverLink}></img>
        </div>
      ))}
    </div>
  );
};
