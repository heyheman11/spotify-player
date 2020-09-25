import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FloatingPlayer.scss";
import type { PlayerState } from "./typings";

interface FloatingPlayerProps {
  playingInformation: PlayerState;
  togglePlayback: any;
  isPlayingLocally: boolean;
}

export const FloatingPlayer: React.FC<FloatingPlayerProps> = ({
  playingInformation,
  togglePlayback,
  isPlayingLocally,
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
    return !isPlayingLocally ? (
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
    return <p>🎹</p>;
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
