import React from "react";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { SPOTIFY_API_URL, HTTP } from "./utils/constants";
import Panel from "./Components/Panel";
import { ContainerProps, Track } from "./interfaces/global";

const RecentlyPlayedContainer: React.FC<ContainerProps> = (props) => {
  const [playingInformation, setPlayingInformation] = React.useState<Track[]>();
  const RECENTLY_PLAYED = "/v1/me/player/recently-played?limit=50";

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

  React.useEffect(() => {
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
