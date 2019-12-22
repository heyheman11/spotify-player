import React from "react";
import "./AlbumPanel.scss";

const AlbumPanel = ({ imageLink }) => {
  return (
    <div className="album-panel-container">
      <img src={imageLink}></img>
      <p>Album</p>
    </div>
  );
};

export { AlbumPanel };
