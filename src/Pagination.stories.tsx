import React from "react";
import { Pagination } from "./Pagination";

export default {
  title: "Pagination",
};

export const playingMusic = () => {
  return <Pagination onChange={() => console.log("onForward")} length={3} />;
};
