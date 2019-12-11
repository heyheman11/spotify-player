import React from "react";
import PropTypes from "prop-types";
import "./RecentlyPlayed.scss";

export const RecentlyPlayed = ({ tracks }) => {
  return (
    <div className="recently-played-container">
      <div className="recently-played">
        {tracks.map((item, index) => (
          <div className="recently-played__track-row" key={index}>
            <img src={item.albumCoverLink}></img>
            <div className="track-information">
              <p>{item.artistName}</p>
              <p>{`${item.albumName} - ${item.trackName}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentlyPlayed.propTypes = {
  tracks: PropTypes.shape({
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    trackName: PropTypes.string,
    albumCoverLink: PropTypes.string,
    playedTime: PropTypes.string
  })
};
