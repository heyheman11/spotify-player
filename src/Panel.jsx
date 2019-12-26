import React from "react";
import "./Panel.scss";
import PropTypes from "prop-types";

const Panel = ({ classes, size, children }) => {
  const getClassName = () => {
    const panelSize = `panel-${size ? size : "main"}`;
    return classes ? `${panelSize} ${classes}` : panelSize;
  };

  return <div className={getClassName()}>{children}</div>;
};

Panel.propTypes = {
  size: PropTypes.oneOf(["main", "header"]),
  children: PropTypes.element.isRequired,
  classes: PropTypes.string
};

export default Panel;
