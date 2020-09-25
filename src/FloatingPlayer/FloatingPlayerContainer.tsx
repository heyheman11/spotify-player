import React, { useEffect, useState, useRef } from "react";
import { FloatingPlayer } from "./FloatingPlayer";
// import { usePlayingInformation } from "./usePlayingInformation";
import { HTTP, SPOTIFY_API_URL } from "../utils/constants";
import { PlayerState } from "./typings";
import { Loader } from "../Components/Loader";

interface FloatingPlayerContainerProps {
  accessToken: string;
}

const FloatingPlayerContainer: React.FC<FloatingPlayerContainerProps> = ({
  accessToken,
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>();
  const [isPlayingLocally, setIsPlayingLocally] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  // const playingInformation = usePlayingInformation(accessToken);
  const spotifyPlayerRef = useRef<any>();

  // const handelScriptLoad = () => {
  //   return new Promise(resolve => {
  //     if (window.Spotify) {
  //       resolve();
  //     } else {
  //       window.onSpotifyWebPlaybackSDKReady = resolve;
  //     }
  //   })
  // }

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
  }, []);

  useEffect(() => {
    if (isPlayerReady) {
      console.log("here");
      spotifyPlayerRef.current.connect();
    }
  }, [isPlayerReady]);

  useEffect(() => {
    // Error handling
    if (isPlayerReady) {
      spotifyPlayerRef.current.addListener(
        "initialization_error",
        ({ message }) => {
          console.error(message);
        }
      );

      spotifyPlayerRef.current.addListener(
        "authentication_error",
        ({ message }) => {
          console.error(message);
        }
      );

      spotifyPlayerRef.current.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      spotifyPlayerRef.current.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      spotifyPlayerRef.current.addListener("player_state_changed", (state) => {
        console.log(state);
        if (state) {
          setIsPlayingLocally(true);
          setPlayerState({
            position: state.position,
            isPaused: state.paused,
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
      });

      // Ready
      spotifyPlayerRef.current.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      spotifyPlayerRef.current.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      return () => {
        spotifyPlayerRef.current.removeListener("ready");
        spotifyPlayerRef.current.removeListener("player_state_changed");
        spotifyPlayerRef.current.disconnect();
      };
    }
  }, [isPlayerReady]);

  const togglePlayback = async () => {
    await fetch(
      `${SPOTIFY_API_URL}/v1/me/player/${
        isPlayingLocally && playerState?.isPaused ? "play" : "pause"
      }`,
      {
        method: HTTP.PUT,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  return (
    <FloatingPlayer
      playingInformation={playerState}
      isPlayingLocally={isPlayingLocally}
      togglePlayback={togglePlayback}
      isPlayerReady={isPlayerReady}
    />
  );
};

export default FloatingPlayerContainer;
