import React, { useState, useEffect } from "react";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { SPOTIFY_API_URL, HTTP } from "../utils/constants";
import Panel from "../Components/Panel";
import { ContainerProps, Track } from "../interfaces/global";

const RecentlyPlayedContainer: React.FC<ContainerProps> = (props) => {
  const [playingInformation, setPlayingInformation] = useState<Track[]>();
  const [lastPlayedSongTime, setLastPlayedSongTime] = useState("");
  const RECENTLY_PLAYED = "/v1/me/player/recently-played?limit=20";

  const getTracks = ({ items }) => {
    const tracks = items.map(
      (item: any, index): Track => {
        if (index === items.length - 1) {
          console.log("last item", item.played_at);
          setLastPlayedSongTime(item.played_at);
        }
        return {
          artistName: item.track.album.artists[0].name,
          artistLink: item.track.album.artists[0].href,
          albumName: item.track.album.name,
          albumLink: item.track.album.href,
          trackName: item.track.name,
          albumCoverLink: item.track.album.images[1].url,
          playedTime: item.played_at,
        };
      }
    );
    setPlayingInformation(tracks);
  };

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}${RECENTLY_PLAYED}`, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        // Handle a 401
        // Expired token
        response.json().then();
      }
      response.json().then(getTracks);
    });
  }, []);

  return playingInformation ? (
    <Panel>
      <RecentlyPlayed tracks={playingInformation} />
    </Panel>
  ) : null;
};

export default RecentlyPlayedContainer;
