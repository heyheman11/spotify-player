import { configure } from "@storybook/react";
import "../src/App.scss";

configure(require.context("../src", true, /\.stories\.js$/), module);
