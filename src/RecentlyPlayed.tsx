import * as React from "react";
import { ITrack } from "./interfaces/global";
import "./RecentlyPlayed.scss";

interface IRecentlyPlayedProps {
  tracks: ITrack[] | null;
}

export const RecentlyPlayed: React.FC<IRecentlyPlayedProps> = ({ tracks }) => {
  const getRows = () => {
    if (tracks) {
      return tracks.map((item: ITrack, index: number) => (
        <div className="recently-played__track-row" key={index}>
          <img src={item.albumCoverLink}></img>
          <div className="track-information">
            <p className="primary">{item.albumName}</p>
            <p className="secondary">{item.trackName}</p>
            <p className="secondary">{item.artistName}</p>
          </div>
        </div>
      ));
    } else {
      return null;
    }
  };

  return <>{getRows()}</>;
};
