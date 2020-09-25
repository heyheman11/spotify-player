import React from "react";
import "./InfoPanel.scss";

interface InfoPanelProps {
  type: "general" | "important" | "error" | "success";
  dialogue: string;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ type, dialogue }) => {
  return (
    <div className={`info-panel ${type}`}>
      <div className="info-panel-main">
        <p>{dialogue}</p>
      </div>
      <button>{"X"}</button>
    </div>
  );
};
