import React from "react";
import { Loader } from "./Loader";

export default {
  title: "Loader",
};

export const Default = () => (
  <div
    style={{
      height: "200px",
      width: "200px",
      backgroundColor: "black",
      padding: "20px",
    }}
  >
    <Loader />
  </div>
);

export const withLightBackground = () => (
  <div
    style={{
      height: "200px",
      width: "200px",
      backgroundColor: "white",
      padding: "20px",
    }}
  >
    <Loader isOnLightBackground />
  </div>
);
