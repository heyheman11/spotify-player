import React from "react";
import { FloatingPlayer } from "../FloatingPlayer";

export default {
  title: "Floating Player"
};

const options = {
  togglePlayback: () => {},
  playingInformation: {
    isPlaying: true,
    artistName: "Daniel Zambetto",
    albumName: "One Summer",
    albumImageLink: "",
    songName: "What a night",
    deviceName: "Zamb's iPhone"
  }
};

export const playingMusic = () => {
  return <FloatingPlayer {...options} />;
};
