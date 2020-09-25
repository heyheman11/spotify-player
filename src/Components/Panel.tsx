import React from "react";
import "./Panel.scss";

interface PanelProps {
  size?: "main" | "header";
  classes?: string;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ classes, size, children }) => {
  const getClassName = () => {
    const panelSize = `panel-${size ? size : "main"}`;
    return classes ? `${panelSize} ${classes}` : panelSize;
  };

  return <div className={getClassName()}>{children}</div>;
};

export default Panel;
