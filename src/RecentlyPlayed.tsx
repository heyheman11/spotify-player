import React from "react";
import PropTypes from "prop-types";
import "./RecentlyPlayed.scss";



export const RecentlyPlayed = ({ tracks }) => {
  const getRows = () => {
    return tracks.map((item, index) => (
      <div className="recently-played__track-row" key={index}>
        <img src={item.albumCoverLink}></img>
        <div className="track-information">
          <p className="primary">{item.albumName}</p>
          <p className="secondary">{item.trackName}</p>
          <p className="secondary">{item.artistName}</p>
        </div>
      </div>
    ));
  };

  return <>{getRows()}</>;
};

RecentlyPlayed.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string,
      albumName: PropTypes.string,
      trackName: PropTypes.string,
      albumCoverLink: PropTypes.string,
      playedTime: PropTypes.string
    })
  )
};
