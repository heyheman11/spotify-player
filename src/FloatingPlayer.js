import React, { useState, useEffect } from "react";
import { SPOTIFY_API_URL, HTTP } from "./constants";
import Play from "../play.svg";
import Pause from "../pause.svg";
import "./FloatingPlayer.scss";

export const FloatingPlayer = ({ accessToken }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isNoContent, setIsNoContent] = useState(false);
  const [playingInformation, setPlayingInformation] = useState({});

  const handleOnMouseEnter = () => {
    setIsMouseOn(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOn(false);
  };

  const handlePlayingInfo = data => {
    setPlayingInformation({
      isPlaying: data.is_playing,
      artistName: data.item.album.artists[0].name,
      albumName: data.item.album.name,
      songName: data.item.name,
      deviceName: data.device.name,
      progress: Number(data.progress_ms / 1000 / 60)
    });
  };

  // PUT https://api.spotify.com/v1/me/player/play
  // PUT https://api.spotify.com/v1/me/player/pause

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
      } else if (response.status === 204) {
        setIsNoContent(true);
      }
    });
  }, []);

  const togglePlayback = () => {
    fetch(
      `${SPOTIFY_API_URL}/v1/me/player/${
        playingInformation.isPlaying ? "pause" : "play"
      }`,
      {
        method: HTTP.PUT,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).then(response => {
      // expected RESTful response for PUT
      if (response.status === 204) {
        return;
      }
    });
  };

  const renderOpenedPlayer = () => {
    return isNoContent ? (
      <p>{"Nothing is playing!"}</p>
    ) : (
      <>
        <p className="primary">{playingInformation.songName}</p>
        <p>{playingInformation.artistName}</p>
        <p>{playingInformation.albumName}</p>
        <button onClick={togglePlayback}>
          {playingInformation.isPlaying ? (
            <Pause width="20" height="20" />
          ) : (
            <Play width="20" height="20" />
          )}
        </button>
      </>
    );
  };

  const renderClosedPlayer = () => {
    return (
      <p>
        {playingInformation.isPlaying ? (
          <Pause width="20" height="20" />
        ) : (
          <Play width="20" height="20" />
        )}
      </p>
    );
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
