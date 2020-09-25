import React from "react";

interface RadioButtonProps {
  title: string;
  value: string;
  optionSelected: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ title, value, optionSelected, handleChange }) => {
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
