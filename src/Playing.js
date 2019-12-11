import React from "react";

const ob = {
  artist: {
    name: "",
    linkToSpotify: ""
  },
  playing: {
    deviceName: "",
    albumName: "",
    songName: "",
    albumCoverLink: ""
  }
};

const Playing = ({ artist, playing }) => {
  return (
    <div classname="playing-container">
      <p>{`Playing on: ${playing.deviceName}`}</p>
      <p>{`Artist ${artist.name}`}</p>
      <p>{`Album ${playing.albumName}`}</p>
      <p>
        {`Song `}
        <a href={props.linkToPlaying}>{playing.songName}</a>
      </p>
      <img
        src={playing.albumeCoverLink}
        alt={`Album cover art for ${playing.albumName}`}
      ></img>
    </div>
  );
};
