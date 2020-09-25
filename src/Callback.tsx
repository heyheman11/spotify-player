import React from "react";
import { InfoPanel } from "./Components/InfoPanel";
import { Redirect } from "react-router-dom";

export const Callback: React.FC<{}> = () => {
  const getToken = (hash: String) => {
    return hash.substring(1).split("&")[0].split("=")[1];
  };

  const renderElements = () => {
    if (location.hash) {
      return (
        <Redirect
          to={{
            pathname: "/home",
            state: { accessToken: getToken(location.hash) },
          }}
        />
      );
    }
    return <InfoPanel type="error" dialogue={location.search} />;
  };

  return renderElements();
};
