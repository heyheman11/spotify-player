import { SETTINGS, SCOPE } from "./constants";
import querystring from "querystring";

const getQueryString = () => {
  return querystring.stringify({
    client_id: SETTINGS.CLIENT_ID,
    response_type: "token",
    redirect_uri: SETTINGS.REDIRECT_URL,
    scope: SCOPE.join(" ")
  });
};

const baseUrl = `${SETTINGS.SPOTIFY_BASE_URL}/authorize?${getQueryString()}`;

export { baseUrl };
