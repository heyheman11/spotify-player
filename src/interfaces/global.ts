export interface ContainerProps {
  accessToken: string;
}

export interface Track {
  artistName: string;
  artistLink: string;
  albumName: string;
  albumLink: string;
  trackName: string;
  albumCoverLink: string;
  playedTime: number;
}