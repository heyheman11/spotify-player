import React from "react";
import { Pagination } from "./Pagination";

export default {
  title: "Pagination",
};

export const playingMusic = () => {
  return <Pagination onClick={() => console.log("on click")} length={3} />;
};
