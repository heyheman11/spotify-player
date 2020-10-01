import { useState, useEffect } from "react";
import { HTTP, ENDPOINTS } from "../utils/constants";
import { request } from "../utils/common";
import type { SongState, Device } from "./typings";

/**
 *
 * Returns information about the users currently playing sessions
 * @param accessToken
 *
 */
export const usePlayingInformation = (
  accessToken: string
): [SongState | undefined, Device | undefined, boolean] => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songState, setSongState] = useState<SongState | undefined>();
  const [device, setDevice] = useState<Device | undefined>();

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
  }, [accessToken]);

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
  }, [isPlaying, accessToken]);

  return [songState, device, isPlaying];
};
