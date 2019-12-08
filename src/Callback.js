import React from "react";
import { InfoPanel } from "./InfoPanel";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home } from "./Home";

export const SUCCESS =
  "Success! You have been successfully authenticated with Spotify.";

export const Callback = () => {
  // error message
  const renderElements = () => {
    if (location.hash) {
      return (
        <Switch>
          <Redirect push to="/home" />
          <Route>
            <Home accessToken={"WE IN BABY"} />
          </Route>
        </Switch>
      );
      // return <InfoPanel type="success" dialogue={SUCCESS} />;
    }
    return <InfoPanel type="error" dialogue={location.search} />;
  };

  return renderElements();
};
