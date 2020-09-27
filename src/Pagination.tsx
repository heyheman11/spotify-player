import React, { useState } from "react";

const Pagination = ({ onChange, length }) => {
  const getBalls = () => {
    let balls: any = [];

    for (let i = 0; i <= length - 1; i++) {
      balls.push(
        <button
          key={i}
          onChange={(event) => {
            onChange(event, i);
          }}
        >
          {i + 1}
        </button>
      );
    }
    return balls;
  };
  return <div className="button-group">{getBalls()}</div>;
};

export { Pagination };
