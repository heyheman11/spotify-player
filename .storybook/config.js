import { configure } from "@storybook/react";
import "../src/styles/global.scss";

configure(require.context("../src", true, /\.stories\.(j|t)sx?$/), module);
