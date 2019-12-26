import React, { useState, useEffect } from "react";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { SPOTIFY_API_URL, HTTP } from "./utils/constants";
import Panel from "./Panel";
import PropTypes from "prop-types";

// Container should make fetch calls
// Pass down information to children
// Tell Home when access token has expired

const RecentlyPlayedContainer = ({ accessToken }) => {
  const [playingInformation, setPlayingInformation] = useState([]);
  const RECENTLY_PLAYED = "/v1/me/player/recently-played?limit=50";

  const getTracks = ({ items }) => {
    const tracks = items.map(item => {
      return {
        artistName: item.track.album.artists[0].name,
        artistLink: item.track.album.artists[0].href,
        albumName: item.track.album.name,
        albumLink: item.track.album.href,
        trackName: item.track.name,
        albumCoverLink: item.track.album.images[1].url,
        playedTime: item.played_at
      };
    });
    setPlayingInformation(tracks);
  };

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}${RECENTLY_PLAYED}`, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.status === 401) {
        // Handle a 401
        // Expired token
        response.json().then();
      }
      response.json().then(getTracks);
    });
  }, []);

  return (
    <Panel>
      <RecentlyPlayed tracks={playingInformation} />
    </Panel>
  );
};

RecentlyPlayedContainer.propTypes = {
  accessToken: PropTypes.string
};

export default RecentlyPlayedContainer;
