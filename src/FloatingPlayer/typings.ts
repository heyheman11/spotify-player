export interface PlayerState {
  songState: SongState;
  device: Device;
}

export interface Device {
  name: string;
  type: string;
  id: string;
}

export interface SongState {
  position?: number;
  isPlaying: boolean;
  duration?: number;
  artistName: string;
  artistLink?: string;
  albumName: string;
  songName: string;
  albumImageLink: string;
  progress?: number;
}
