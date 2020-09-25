/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { HTTP, SPOTIFY_API_URL } from "../utils/constants";

export const usePlayingInformation = accessToken => {
  // const [isNoContent, setIsNoContent] = useState(false);
  const [playingInformation, setPlayingInformation] = useState({});

  // const getPlayingContext = () => {
  //   fetch(`${SPOTIFY_API_URL}/v1/me/player`, {
  //     method: HTTP.GET,
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   }).then(response => {
  //     if (response.status === 200) {
  //       console.log();
  //     }
  //   });
  // };

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
        response.json().then(data => {
          setPlayingInformation({
            isPlaying: data.is_playing,
            artistName: data.item.album.artists.map(artist => artist.name),
            albumName: data.item.album.name,
            albumImageLink: data.item.album.images[2].url,
            songName: data.item.name,
            deviceName: data.device.name,
            deviceType: data.device.type,
            progress: Number(data.progress_ms / 1000 / 60)
          });
        });
      } else if (response.status === 204) {
        console.log("nothing is playing");
      }
    }),
      [];
  });

  return playingInformation;
};
