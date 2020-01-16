import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./FloatingPlayer.scss";

export const FloatingPlayer = ({
  playingInformation,
  togglePlayback,
  isPlaying
}) => {
  const [isMouseOn, setIsMouseOn] = useState(false);

  const handleOnMouseEnter = () => {
    setIsMouseOn(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOn(false);
  };

  const renderOpenedPlayer = () => {
    return !isPlaying ? (
      <p>{"Nothing is playing!"}</p>
    ) : (
      <div className="floating-player-inner">
        <h3>Currently playing</h3>
        <Link to={`/artist/${playingInformation.artistLink.split(":")[2]}`}>
          {playingInformation.artistName}
        </Link>
        <img src={playingInformation.albumImageLink} />
        <h4 className="primary">{playingInformation.songName}</h4>
        <p>{playingInformation.albumName}</p>
        <button onClick={togglePlayback}>
          {playingInformation.isPaused ? "play" : "pause"}
        </button>
      </div>
    );
  };

  const renderClosedPlayer = () => {
    return <p>{playingInformation.isPaused ? ">" : "||"}</p>;
  };

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className="floating-player"
    >
      {isMouseOn ? renderOpenedPlayer() : renderClosedPlayer()}
    </div>
  );
};

FloatingPlayer.propTypes = {
  isLoading: PropTypes.bool,
  playingInformation: PropTypes.shape({
    position: PropTypes.string,
    isPaused: PropTypes.string,
    duration: PropTypes.string,
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    artistLink: PropTypes.string,
    songName: PropTypes.string,
    albumImageLink: PropTypes.string,
    device: PropTypes.string
  }),
  togglePlayback: PropTypes.func,
  isPlaying: PropTypes.bool
};
