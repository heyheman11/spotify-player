import React from "react";
import "./Loader.scss";

interface LoaderProps {
  isOnLightBackground?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isOnLightBackground = false }) => {
  const getCLassNameList = () => {
    let classes = ["loader-inner"];
    if (isOnLightBackground) {
      classes.push("loader-inner-light");
    }
    return classes.join(" ");
  };

  return (
    <div className="loader-container">
      <div className={getCLassNameList()}></div>
    </div>
  );
};

export { Loader };
