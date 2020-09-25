export interface PlayerState {
  position: number;
  isPaused: boolean;
  duration: string;
  artistName: string;
  artistLink?: string;
  albumName: string;
  songName: string;
  albumImageLink: string;
}