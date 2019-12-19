import React, { useState, useEffect } from "react";
import { SPOTIFY_API_URL, HTTP } from "./util/constantss";
import Play from "../play.svg";
import Pause from "../pause.svg";
import "./FloatingPlayer.scss";

export const FloatingPlayer = ({ accessToken }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isNoContent, setIsNoContent] = useState(false);
  const [playingInformation, setPlayingInformation] = useState({});

  // PUT https://api.spotify.com/v1/me/player/play
  // PUT https://api.spotify.com/v1/me/player/pause

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}/v1/me/player/currently-playing`, {
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
  });

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}v1/me/player/devices`, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      console.log(response);
    });
  }, []);

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
      albumImageLink: data.item.album.images[2].url,
      songName: data.item.name,
      deviceName: data.device.name,
      progress: Number(data.progress_ms / 1000 / 60)
    });
  };

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
      <div className="floating-player-inner">
        <h3>Currently playing</h3>
        <p className="primary">{playingInformation.songName}</p>
        <p>{playingInformation.artistName}</p>
        <p>{playingInformation.albumName}</p>
        <button onClick={togglePlayback}>
          {playingInformation.isPlaying ? "||" : ">"}
        </button>
      </div>
    );
  };

  const renderClosedPlayer = () => {
    return <p>{playingInformation.isPlaying ? "||" : ">"}</p>;
  };

  console.log(playingInformation);
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
