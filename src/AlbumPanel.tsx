import React from "react";
import { HTTP } from "./utils/constants";
import "./AlbumPanel.scss";

type AlbumPanelOrientation = "vertical" | "horizontal";

interface AlbumPanelProps {
  audioType: string;
  trackId: string;
  orientation?: AlbumPanelOrientation;
  imageLink: string;
  artistName: string;
  albumName: string;
}

const AlbumPanel: React.FC<AlbumPanelProps> = ({
  audioType,
  trackId,
  artistName,
  albumName,
  imageLink,
  orientation = "vertical",
}) => {
  const playTrackHandler = async () => {
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: HTTP.PUT,
      body: JSON.stringify({ uris: [`spotify:${audioType}:${trackId}`] }),
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
