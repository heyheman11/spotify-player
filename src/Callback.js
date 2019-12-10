import React from "react";
import { InfoPanel } from "./InfoPanel";
import { useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";

export const SUCCESS =
  "Success! You have been successfully authenticated with Spotify.";

export const Callback = () => {
  const dispatch = useDispatch();

  const renderElements = () => {
    if (location.hash) {
      dispatch({ type: 'ADD_TOKEN', payload: location.hash })
      return (
        <Redirect to="/home" />
      );
      // return <InfoPanel type="success" dialogue={SUCCESS} />;
    }
    return <InfoPanel type="error" dialogue={location.search} />;
  };

  return renderElements();
};
