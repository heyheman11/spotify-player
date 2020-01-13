import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FloatingPlayer.scss";

export const FloatingPlayer = ({
  playingInformation,
  togglePlayback
  // isLoading
}) => {
  const [isMouseOn, setIsMouseOn] = useState(false);

  const handleOnMouseEnter = () => {
    setIsMouseOn(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOn(false);
  };

  const renderOpenedPlayer = () => {
    return !playingInformation ? (
      <p>{"Nothing is playing!"}</p>
    ) : (
      <div className="floating-player-inner">
        <h3>Currently playing</h3>
        <img src={playingInformation.albumImageLink} />
        <h4 className="primary">{playingInformation.songName}</h4>
        <p>{playingInformation.albumName}</p>
        <p>{playingInformation.artistName}</p>
        <button onClick={togglePlayback}>
          {playingInformation.isPlaying ? "||" : ">"}
        </button>
      </div>
    );
  };

  const renderClosedPlayer = () => {
    return <p>{playingInformation.isPlaying ? "||" : ">"}</p>;
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
  playingInformation: PropTypes.object,
  togglePlayback: PropTypes.func
};
