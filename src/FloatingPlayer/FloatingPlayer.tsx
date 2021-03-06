import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Components/Loader";
import "./FloatingPlayer.scss";
import { Device, SongState } from "./typings";

interface FloatingPlayerProps {
  playingInformation?: SongState;
  togglePlayback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Is music coming from the browser SDK */
  isPlayingLocally: boolean;
  /** State of the sdk on the window object */
  isPlayerReady: boolean;
  deviceState?: Device;
}

export const FloatingPlayer: React.FC<FloatingPlayerProps> = ({
  playingInformation,
  togglePlayback,
  isPlayingLocally,
  isPlayerReady,
  deviceState,
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
      if (playingInformation?.artistLink) {
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
      if (playingInformation) {
        return (
          <>
            <h3>Currently playing</h3>
            <p>{`${deviceState?.name} ${deviceState?.type}`}</p>
            {getArtistLink()}
            <img src={playingInformation?.albumImageLink} />
            <h4 className="primary">{playingInformation?.songName}</h4>
            <p>{playingInformation?.albumName}</p>
            <button onClick={togglePlayback}>
              {playingInformation?.isPlaying ? "pause" : "play"}
            </button>
          </>
        );
      }
      return <p>{"Nothing is playing on this device!"}</p>;
    }

    return (
      <>
        <h3>Currently playing</h3>
        {getArtistLink()}
        <img src={playingInformation?.albumImageLink} />
        <h4 className="primary">{playingInformation?.songName}</h4>
        <p>{playingInformation?.albumName}</p>
        <button onClick={togglePlayback}>
          {playingInformation?.isPlaying ? "pause" : "play"}
        </button>
      </>
    );
  };

  const renderClosedPlayer = () => {
    if (!isPlayerReady) {
      return <Loader />;
    }
    if (playingInformation?.isPlaying) {
      return <p className="floating-player--icon__dancing">🎵</p>;
    }
    return <p className="floating-player--icon">🎵</p>;
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
