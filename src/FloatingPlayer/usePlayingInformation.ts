/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { HTTP, ENDPOINTS } from "../utils/constants";
import { request } from "../utils/common";

export const usePlayingInformation = (accessToken: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songState, setSongState] = useState<any>();
  const [device, setDevice] = useState<any>();

  const setSongStateMapper = ({ is_playing, item, progress_ms }) => {
    setSongState({
      isPlaying: is_playing,
      artistName: item.album.artists.map((artist) => artist.name),
      albumName: item.album.name,
      albumImageLink: item.album.images[2].url,
      songName: item.name,
      progress: Number(progress_ms / 1000 / 60),
    });
  };

  const setDeviceMapper = ({ device, is_playing }) => {
    setDevice({
      name: device.name,
      type: device.type,
    });

    if (is_playing) {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    request(
      { url: ENDPOINTS.player, method: HTTP.GET, token: accessToken },
      setDeviceMapper
    );
  }, []);

  useEffect(() => {
    if (isPlaying) {
      request(
        {
          url: ENDPOINTS.currentlyPlaying,
          method: HTTP.GET,
          token: accessToken,
        },
        setSongStateMapper
      );
    }
  }, [isPlaying]);

  console.log("isPLaying??", isPlaying)

  return [songState, device, isPlaying];
};
