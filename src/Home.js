import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { InfoPanel } from "./InfoPanel";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { SPOTIFY_API_URL, HTTP } from "./constants";

// TODO:
// 1. Make InfoPanel only appear on login
// Ability to remove InfoPanel
// 2. Correct protect routes

export const Home = () => {
  const loginState = useSelector(state => state.login);
  const [playingInformation, setPlayingInformation] = useState([]);
  const SUCCESS =
    "Success! You have been successfully authenticated with Spotify.";

  if (!loginState.accessToken) {
    return <Redirect to="/" />;
  }

  const getTracks = trackList => {
    const tracks = trackList.map(item => {
      return {
        artistName: item.track.album.artists[0].name,
        albumName: item.track.album.name,
        trackName: item.track.name,
        albumCoverLink: item.track.album.images[2].url,
        playedTime: item.played_at
      };
    });
    setPlayingInformation(tracks);
  };

  useEffect(() => {
    fetch(SPOTIFY_API_URL, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${loginState.accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => getTracks(data.items));
  }, []);

  return (
    <>
      <InfoPanel type="success" dialogue={SUCCESS} />
      <RecentlyPlayed tracks={playingInformation} />
    </>
  );
};
