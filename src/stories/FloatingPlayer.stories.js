import React from "react";
import { FloatingPlayer } from "../FloatingPlayer";

export default {
  title: "Floating Player"
};

const options = {
  togglePlayback: () => {},
  playingInformation: {
    isPlaying: true,
    artistName: "Bjork",
    albumName: "Debut",
    albumImageLink:
      "https://i.scdn.co/image/ab67616d00001e02768d171a47a3adae90c7c48a",
    songName: "Venus as a boy",
    deviceName: "Zamb's iPhone"
  }
};

export const playingMusic = () => {
  return <FloatingPlayer {...options} />;
};
