import React, { useState } from "react";
import "./Pagination.scss";

interface PaginationProps {
  /** Callback function that will be called with the event and index */
  onClick: (event: React.MouseEvent<HTMLButtonElement>, i: number) => void;
  /** The number of pages you would like */
  length: number;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ onClick, length }) => {
    const [selectedBall, setSelectedBall] = useState(0);

    const getBalls = () => {
      let balls: any = [];

      for (let i = 0; i <= length - 1; i++) {
        balls.push(
          <button
            key={i}
            onClick={(event) => {
              onClick(event, i);
              setSelectedBall(i);
            }}
            className={`pagination-button${
              selectedBall === i ? " pagination-button__selected" : ""
            }`}
          >
            {i + 1}
          </button>
        );
      }
      return balls;
    };

    return <div className="pagination">{getBalls()}</div>;
  }
);

export { Pagination };
