import { SETTINGS, SCOPE } from "./constants";
import querystring from "querystring";

const getQueryString = () => {
  return querystring.stringify({
    client_id: SETTINGS.CLIENT_ID,
    response_type: "token",
    redirect_uri: SETTINGS.REDIRECT_URL,
    scope: SCOPE.join(" "),
  });
};

const baseUrl = `${SETTINGS.SPOTIFY_BASE_URL}/authorize?${getQueryString()}`;

/** Wrapper around fetch, will execute callback with results */
const request = async (
  { url, token, method }: { url: string; token: string; method: string },
  callback?: (results: unknown) => void,
  emptyCallback?: (results: unknown) => void
): Promise<void> => {
  const results = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (callback && results.status === 200) {
    callback(await results.json());
  }

  if (emptyCallback && results.status === 204) {
    emptyCallback(await results.json());
  }
};

export { baseUrl, request };
