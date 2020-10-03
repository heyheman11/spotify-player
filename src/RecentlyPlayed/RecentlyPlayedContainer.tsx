import React, { useState, useEffect } from "react";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { ENDPOINTS } from "../utils/constants";
import { request } from "../utils/common";
import Panel from "../Components/Panel";
import { ContainerProps, Track } from "../interfaces/global";

const RecentlyPlayedContainer: React.FC<ContainerProps> = (props) => {
  const [playingInformation, setPlayingInformation] = useState<Track[]>();

  const getTracks = ({ items }) => {
    const tracks = items.map(
      (item: any): Track => {
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
    request(
      {
        url: `${ENDPOINTS.recentlyPlayed}?limit=10`,
        method: "get",
        token: props.accessToken,
      },
      (results: any) => getTracks(results)
    );
  }, []);

  return playingInformation ? (
    <Panel>
      <RecentlyPlayed tracks={playingInformation} />
    </Panel>
  ) : null;
};

export default RecentlyPlayedContainer;
