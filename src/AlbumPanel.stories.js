import React from "react";
import { AlbumPanel } from "./AlbumPanel";

export default { title: "AlbumPanel" };

export const withVertical = () => (
  <AlbumPanel
    imageLink={
      "https://i.scdn.co/image/ab67616d00001e0254c5c304064df85d61253ac7"
    }
    trackId="123"
    audioType="track"
  />
);

export const withHorizontal = () => (
  <AlbumPanel
    imageLink={
      "https://i.scdn.co/image/ab67616d00001e0254c5c304064df85d61253ac7"
    }
    orientation="horizontal"
    trackId="123"
    audioType="track"
  />
);
