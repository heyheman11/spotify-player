import * as React from "react";
import { HTTP } from "./utils/constants";
import "./AlbumPanel.scss";

const ORIENTATION_VALUES = ["vertical", "horizontal"];

const AlbumPanel = ({
  audioType,
  trackId,
  artistName,
  albumName,
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

  // 1. Show icon on mouseEnter
  // 2. Display play OR pause icon depending on currently playing

  return (
    <div className={`album-panel-container ${orientation}`}>
      <button onClick={playTrackHandler}>
        <img src={imageLink}></img>
        {/* <Play /> */}
      </button>
      <div className="inner">
        <p>{albumName}</p>
        <p>{artistName}</p>
      </div>
    </div>
  );
};

export { AlbumPanel };

// AlbumPanel.propTypes = {
//   audioType: PropTypes.string.isRequired,
//   trackId: PropTypes.string.isRequired,
//   orientation: PropTypes.oneOf(ORIENTATION_VALUES),
//   imageLink: PropTypes.string.isRequired,
//   artistName: PropTypes.string.isRequired,
//   albumName: PropTypes.string.isRequired
// };
