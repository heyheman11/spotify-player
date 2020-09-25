import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Components/Loader";
import "./FloatingPlayer.scss";
import { PlayerState } from "./typings";

interface FloatingPlayerProps {
  playingInformation?: PlayerState;
  togglePlayback: any;
  isPlayingLocally: boolean;
  isPlayerReady: boolean;
}

export const FloatingPlayer: React.FC<FloatingPlayerProps> = ({
  playingInformation,
  togglePlayback,
  isPlayingLocally,
  isPlayerReady,
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
    if (!isPlayerReady) {
      return <Loader isOnLightBackground />;
    }
    if (!isPlayingLocally) {
      <p>{"Nothing is playing on this device!"}</p>;
    }
    return (
      <>
        <h3>Currently playing</h3>
        {getArtistLink()}
        <img src={playingInformation?.albumImageLink} />
        <h4 className="primary">{playingInformation?.songName}</h4>
        <p>{playingInformation?.albumName}</p>
        <button onClick={togglePlayback}>
          {playingInformation?.isPaused ? "play" : "pause"}
        </button>
      </>
    );
  };

  const renderClosedPlayer = () => {
    if (!isPlayerReady) {
      return <Loader />;
    }
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
