const HTTP = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT"
};

const SETTINGS = {
  SPOTIFY_BASE_URL: "https://accounts.spotify.com",
  CLIENT_ID: "10cc273be38a455695d76bf4ccacba52",
  CLIENT_SECRET: "77bc0a5c8a45491c9fcb1b15e0711649",
  REDIRECT_URL: `${window.location.origin}/callback`
};

const ALERTS = {
  SUCCESS: {
    LOGIN: "Success! You have been successfully authenticated with Spotify."
  }
};

const SPOTIFY_API_URL = "https://api.spotify.com";

const ENDPOINTS = {
  me: `${SPOTIFY_API_URL}/v1/me`,
  play: `${SPOTIFY_API_URL}/v1/me/player/play`,
  player: `${SPOTIFY_API_URL}/v1/me/player`,
  currentlyPlaying: `${SPOTIFY_API_URL}/v1/me/player/currently-playing`,
  recentlyPlayed: `${SPOTIFY_API_URL}/v1/me/player/recently-played`
}

const SCOPE = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-library-read",
  "playlist-read-private",
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-modify-playback-state",
  "streaming",
  "user-read-private"
];

export { HTTP, SETTINGS, SCOPE, SPOTIFY_API_URL, ALERTS, ENDPOINTS };
