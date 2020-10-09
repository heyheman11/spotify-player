import React from "react";
import { AlbumPanel } from "./AlbumPanel";

export default {
  title: "Album Panel",
  decorators: [
    (storyFn) => (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
  argTypes: {
    orientation: {
      control: {
        type: "radio",
        options: ["horizontal", "vertical"],
      },
    },
  },
};

const Template = (args) => <AlbumPanel {...args} />;

export const Default = Template.bind({});

Default.args = {
  imageLink: "https://i.scdn.co/image/ab67616d00001e02768d171a47a3adae90c7c48a",
  trackId: "123",
  audioType: "track",
  artistName: "Bjork",
  albumName: "Debut",
  orientation: "horizontal",
};

// export const withVertical = () => <AlbumPanel {...options} />;

// export const withHorizontal = () => (
//   <AlbumPanel {...options} orientation="horizontal" />
// );
