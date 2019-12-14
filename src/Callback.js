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

// callback to pass access token to /home
// Home should store access token, then pass it down to the main components
// 1. Recently played
// 2. Profile information
// 3. Floating player
