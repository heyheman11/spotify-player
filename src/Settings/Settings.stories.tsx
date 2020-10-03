import React from "react";
import Settings from "./Settings";

export default {
  title: "Settings",
  decorators: [
    storyFn => (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};

export const withVertical = () => <Settings />;
