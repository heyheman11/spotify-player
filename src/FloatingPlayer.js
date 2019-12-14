import React, { useState, useEffect } from "react";
import { SPOTIFY_API_URL, HTTP } from "./constants";
import "./FloatingPlayer.scss";

export const FloatingPlayer = ({ accessToken }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [playingInformation, setPlayingInformation] = useState({});

  const handleOnMouseEnter = () => {
    setIsMouseOn(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOn(false);
  };

  const handlePlayingInfo = data => {
    console.log(data);
    setPlayingInformation({
      isPlaying: data.is_playing,
      artistName: data.item.album.artists[0].name,
      albumName: data.item.album.name,
      songName: data.item.name,
      deviceName: data.device.name,
      progress: Number(data.progress_ms / 1000 / 60)
    });
  };

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}/v1/me/player`, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.status === 401) {
        response.json().then();
      } else if (response.status === 200) {
        response.json().then(handlePlayingInfo);
      }
    });
  }, []);

  const renderOpenedPlayer = () => {
    return (
      <>
        <p className="primary">{playingInformation.songName}</p>
        <p>{playingInformation.artistName}</p>
        <p>{playingInformation.albumName}</p>
      </>
    );
  };

  const renderClosedPlayer = () => {
    return <p>{playingInformation.isPlaying ? ">" : "||"}</p>;
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
