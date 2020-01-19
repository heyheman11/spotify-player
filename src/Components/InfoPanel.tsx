import * as React from "react";
import PropTypes from "prop-types";
import "./InfoPanel.scss";

export const InfoPanel = props => {
  const { type, dialogue } = props;
  return (
    <div className={`info-panel ${type}`}>
      <div className="info-panel-main">
        <p>{dialogue}</p>
      </div>
      <button>{"X"}</button>
    </div>
  );
};

InfoPanel.propTypes = {
  type: PropTypes.oneOf(["general", "important", "error", "success"]),
  dialogue: PropTypes.string
};
