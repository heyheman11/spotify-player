import * as React from "react";

interface IRadioButtonProps {
  title: string;
  value: string;
  optionSelected: string;
  handleChange: (event: React.ChangeEvent): void;
}

const RadioButton: React.FC<IRadioButtonProps> = ({ title, value, optionSelected, handleChange }) => {
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
