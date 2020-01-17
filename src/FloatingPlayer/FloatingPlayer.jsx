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

  const getArtistLink = () => {
    if (playingInformation && playingInformation.artistName) {
      const { artistName } = playingInformation;
      if (playingInformation && playingInformation.artistLink) {
        const link = playingInformation.artistLink.split(":")[2];
        return (
          <Link to={`/home/artist/${link}`}>
            {playingInformation.artistName}
          </Link>
        );
      } else {
        return artistName;
      }
    } else {
      return null;
    }
  };

  const renderOpenedPlayer = () => {
    return !isPlaying ? (
      <p>{"Nothing is playing on this device!"}</p>
    ) : (
      <>
        <h3>Currently playing</h3>
        {getArtistLink()}
        <img src={playingInformation.albumImageLink} />
        <h4 className="primary">{playingInformation.songName}</h4>
        <p>{playingInformation.albumName}</p>
        <button onClick={togglePlayback}>
          {playingInformation.isPaused ? "play" : "pause"}
        </button>
      </>
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
      <div className="floating-player-inner">
        {isMouseOn ? renderOpenedPlayer() : renderClosedPlayer()}
      </div>
    </div>
  );
};

FloatingPlayer.propTypes = {
  isLoading: PropTypes.bool,
  playingInformation: PropTypes.shape({
    position: PropTypes.number,
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
