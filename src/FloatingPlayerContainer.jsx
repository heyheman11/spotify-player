import React from "react";
import { SPOTIFY_API_URL, HTTP } from "./utils/constants";
import { FloatingPlayer } from "./FloatingPlayer";
import PropTypes from "prop-types";
import { usePlayingInformation } from "./usePlayingInformation";

const FloatingPlayerContainer = ({ accessToken }) => {
  // const [isNoContent, setIsNoContent] = useState(false);
  // const [playingContext, setPlayingContext] = useState({});
  // const [playingInformation, setPlayingInformation] = useState({});

  const playingInformation = usePlayingInformation(accessToken);

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

  return (
    <FloatingPlayer
      isLoading={playingInformation === null}
      togglePlayback={togglePlayback}
      playingInformation={playingInformation}
    />
  );
};

FloatingPlayerContainer.propTypes = {
  accessToken: PropTypes.string
};

export default FloatingPlayerContainer;
