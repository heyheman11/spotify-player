export interface PlayerState {
  songState: SongState;
  device: Device;
}

export interface Device {
  name: string;
  type: string;
}

export interface SongState {
  position: number;
  isPaused: boolean;
  isPlaying?: boolean;
  duration: string;
  artistName: string;
  artistLink?: string;
  albumName: string;
  songName: string;
  albumImageLink: string;
}