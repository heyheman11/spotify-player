import React from "react";
import PropTypes from "prop-types";
import "./InfoPanel.scss";
import Exit from "../exit-thin.svg";
import Alert from "../alert.svg";

export const InfoPanel = props => {
  const { type, dialogue } = props;
  return (
    <div className={`info-panel ${type}`}>
      <div className="info-panel-main">
        <Alert />
        <p>{dialogue}</p>
      </div>
      <button>
        <Exit />
      </button>
    </div>
  );
};

InfoPanel.propTypes = {
  type: PropTypes.oneOf(["general", "important", "error", "success"]),
  dialogue: PropTypes.string
};
