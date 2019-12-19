import React from "react";
import { InfoPanel } from "./InfoPanel";
import { Redirect } from "react-router-dom";

export const Callback = () => {
  const getToken = hashString => {
    return hashString
      .substring(1)
      .split("&")[0]
      .split("=")[1];
  };

  const renderElements = () => {
    if (location.hash) {
      const accessToken = getToken(location.hash);
      return (
        <Redirect
          to={{ pathname: "/home", state: { accessToken: accessToken } }}
        />
      );
    }
    return <InfoPanel type="error" dialogue={location.search} />;
  };

  return renderElements();
};
