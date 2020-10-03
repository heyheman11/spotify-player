import React, { useEffect, useState, useRef } from "react";
import { FloatingPlayer } from "./FloatingPlayer";
import { usePlayingInformation } from "./usePlayingInformation";
import { HTTP, ENDPOINTS } from "../utils/constants";
import { SongState } from "./typings";
// import { Loader } from "../Components/Loader";
import { request } from "../utils/common";

interface FloatingPlayerContainerProps {
  accessToken: string;
}

const FloatingPlayerContainer: React.FC<FloatingPlayerContainerProps> = ({
  accessToken,
}) => {
  const [playerState, setPlayerState] = useState<SongState>();
  const [isPlayingLocally, setIsPlayingLocally] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [
    playingInformation,
    deviceInformation,
    isPlaying,
  ] = usePlayingInformation(accessToken);
  const spotifyPlayerRef = useRef<Spotify.SpotifyPlayer>();

  // console.log("playingInformation", playingInformation);

  console.log("deviceInformation", deviceInformation);

  useEffect(() => {
    if (window.Spotify) {
      spotifyPlayerRef.current = new Spotify.Player({
        name: "Hairy Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
      });
      setIsPlayerReady(true);
    }

    // eslint-disable-next-line no-undef
    window.onSpotifyWebPlaybackSDKReady = () => {
      spotifyPlayerRef.current = new Spotify.Player({
        name: "Hair Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
      });
      setIsPlayerReady(true);
    };
  }, [accessToken]);

  useEffect(() => {
    if (isPlayerReady) {
      console.log("here");
      spotifyPlayerRef?.current?.connect();
    }
  }, [isPlayerReady]);

  useEffect(() => {
    // Error handling
    if (isPlayerReady) {
      spotifyPlayerRef?.current?.addListener(
        "initialization_error",
        ({ message }) => {
          console.error(message);
        }
      );

      spotifyPlayerRef?.current?.addListener(
        "authentication_error",
        ({ message }) => {
          console.error(message);
        }
      );

      spotifyPlayerRef?.current?.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      spotifyPlayerRef?.current?.addListener(
        "playback_error",
        ({ message }) => {
          console.error(message);
        }
      );

      // Playback status updates
      spotifyPlayerRef?.current?.addListener(
        "player_state_changed",
        (state) => {
          console.log(state);
          if (state) {
            setIsPlayingLocally(true);
            setPlayerState({
              position: state.position,
              isPlaying: !state.paused,
              duration: state.duration,
              artistName: state.track_window.current_track.artists[0].name,
              artistLink: state.track_window.current_track.artists[0].uri,
              albumName: state.track_window.current_track.album.name,
              songName: state.track_window.current_track.name,
              albumImageLink:
                state.track_window.current_track.album.images[0].url,
            });
          } else {
            setIsPlayingLocally(false);
          }
        }
      );

      // Ready
      spotifyPlayerRef?.current?.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      spotifyPlayerRef?.current?.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      return () => {
        spotifyPlayerRef?.current?.removeListener("ready");
        spotifyPlayerRef?.current?.removeListener("player_state_changed");
        spotifyPlayerRef?.current?.disconnect();
      };
    }
  }, [isPlayerReady]);

  const togglePlayback = async () => {
    await request({
      url:
        playerState?.isPlaying || playingInformation?.isPlaying
          ? ENDPOINTS.pause
          : ENDPOINTS.play,
      token: accessToken,
      method: HTTP.PUT,
    });
  };

  return (
    <FloatingPlayer
      playingInformation={isPlayingLocally ? playerState : playingInformation}
      isPlayingLocally={isPlayingLocally}
      togglePlayback={togglePlayback}
      isPlayerReady={isPlayerReady}
      deviceState={deviceInformation}
    />
  );
};

export default FloatingPlayerContainer;
