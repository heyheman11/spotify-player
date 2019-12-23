import React from "react";
import PropTypes from "prop-types";
import { HTTP } from "./utils/constants";
import "./AlbumPanel.scss";

const ORIENTATION_VALUES = ["vertical", "horizontal"];

const AlbumPanel = ({
  audioType,
  trackId,
  imageLink,
  orientation = ORIENTATION_VALUES[0]
}) => {
  const playTrackHandler = event => {
    event.preventDefault;
    const body = { uris: [`spotify:${audioType}:${trackId}`] };
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: HTTP.PUT,
      body
    });
  };

  return (
    <div className={`album-panel-container ${orientation}`}>
      <button onClick={playTrackHandler}>
        <img src={imageLink}></img>
      </button>
      <div className="inner">
        <p>Album Album Album Album</p>
        <p>Song Song Song Song</p>
        <p>Artist Artist Artist Artist</p>
      </div>
    </div>
  );
};

export { AlbumPanel };

AlbumPanel.propTypes = {
  audioType: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  orientation: PropTypes.oneOf(ORIENTATION_VALUES),
  imageLink: PropTypes.string.isRequired
};
