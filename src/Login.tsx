import React from "react";
import * as querystring from "querystring";
import { SETTINGS, SCOPE } from "./utils/constants";
import "./Login.scss";

export const Login = () => {
  const getQueryString = () => {
    return querystring.stringify({
      client_id: SETTINGS.CLIENT_ID,
      response_type: "token",
      redirect_uri: SETTINGS.REDIRECT_URL,
      scope: SCOPE.join(" ")
    });
  };

  const baseUrl = `${SETTINGS.SPOTIFY_BASE_URL}/authorize?${getQueryString()}`;
  
  return (
    <div className="login-page">
      <h1>Spotify Player</h1>
      <a href={baseUrl}>Login</a>
    </div>
  );
};
