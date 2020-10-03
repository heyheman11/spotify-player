import React from "react";
// import { Story } from '@storybook/react/types-6-0';
import { FloatingPlayer } from "./FloatingPlayer";

export default {
  title: "Floating Player",
};
const Template = (args) => <FloatingPlayer {...args} />;

export const Default = Template.bind({});

Default.args = {
  togglePlayback: () => {
    console.log("clicked");
  },
  playingInformation: {
    isPaused: true,
    isPlaying: true,
    artistName: "Bjork",
    albumName: "Debut",
    albumImageLink:
      "https://i.scdn.co/image/ab67616d00001e02768d171a47a3adae90c7c48a",
    songName: "Venus as a boy",
    position: 0,
    duration: 0,
  },
  isPlayingLocally: true,
  isPlayerReady: false,
  deviceState: {
    name: "Spotify Client",
    type: "Desktop",
  },
};

// const options = {
//   togglePlayback: () => {},
//   playingInformation: {
//     isPaused: true,
//     artistName: "Bjork",
//     albumName: "Debut",
//     albumImageLink:
//       "https://i.scdn.co/image/ab67616d00001e02768d171a47a3adae90c7c48a",
//     songName: "Venus as a boy",
//     position: 0,
//     duration: 0,
//   },
//   isPlayingLocally: true,
//   isPlayerReady: false,
//   deviceState: {
//     name: "Spotify Client",
//     type: "Desktop",
//   },
// };

// export const playing = () => {
//   return <FloatingPlayer {...{ ...options, isPlayerReady: true }} />;
// };

// export const paused = () => {
//   return (
//     <FloatingPlayer
//       {...{ ...options, isPlayerReady: true, isPlayingLocally: false }}
//     />
//   );
// };

// export const playingOnAnotherDevice = () => {
//   return (
//     <FloatingPlayer
//       {...{ ...options, isPlayerReady: true, isPlayingLocally: false }}
//     />
//   );
// };

// export const loading = () => {
//   return <FloatingPlayer {...options} />;
// };
