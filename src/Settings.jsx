import React from "react";
import RadioButtonGroup from "./RadioButtonGroup";
import "./Settings.scss";

// const userSettings = {
//   options: [
//     {
//       title: "recentlyPlayed",
//       show: true,
//       style: "table",
//       api: {
//         endpoint: "/v1/me/player/recently-played?limit=50",
//         params: {
//           limit: "50"
//         }
//       }
//     },
//     {
//       title: "floatingPlayer",
//       show: true
//     },
//     {
//       title: "likedSongs",
//       show: true,
//       style: "carousel",
//       api: { endpoint: "", params: {} }
//     }
//   ]
// };

const options = {
  options: [
    {
      title: "recentlyPlayed",
      style: ["table", "carousel"]
    },
    {
      title: "likedSongs",
      style: ["table", "carousel"]
    },
    {
      title: "floatingPlayer"
    }
  ]
};

const Settings = () => {
  const getTitle = title => {
    return title
      ? title
          .match(/(^[a-z]|[A-Z0-9])[a-z]*/g)
          .map(item => item.toLowerCase())
          .join(" ")
      : null;
  };

  const getShowHideInput = title => {
    return (
      <RadioButtonGroup title={`${title}-display`} values={["show", "hide"]} />
    );
  };

  const getStyleSelector = (title, styles) => {
    return <RadioButtonGroup title={`${title}-style`} values={styles} />;
  };

  const getRows = () => {
    return options.options.map((item, index) => (
      <li key={index}>
        <span className="primary">{getTitle(item.title)}</span>
        {getShowHideInput(item.title)}
        {item.style ? getStyleSelector(item.title, item.style) : null}
      </li>
    ));
  };

  return <div className="settings-container">{getRows()}</div>;
};

export default Settings;
