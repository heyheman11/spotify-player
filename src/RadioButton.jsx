import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({ title, value, optionSelected, handleChange }) => {
  return (
    <label>
      <input
        type="radio"
        value={value}
        name={title}
        id={`${title}-${value}`}
        checked={optionSelected === value}
        onChange={handleChange}
      />
      {value}
    </label>
  );
};

export { RadioButton };

RadioButton.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  optionSelected: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
