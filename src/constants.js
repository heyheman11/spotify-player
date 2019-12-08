const HTTP = {
  GET: "GET",
  POST: "POST"
};

const SETTINGS = {
  SPOTIFY_BASE_URL: "https://accounts.spotify.com",
  CLIENT_ID: "10cc273be38a455695d76bf4ccacba52",
  CLIENT_SECRET: "77bc0a5c8a45491c9fcb1b15e0711649",
  REDIRECT_URL: "http://localhost:8080/callback"
};

const SCOPE = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-library-read",
  "playlist-read-private",
  "user-read-private",
  "user-read-email"
];

export { HTTP, SETTINGS, SCOPE };
