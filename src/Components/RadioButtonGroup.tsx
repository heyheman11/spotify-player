import React from "react";
import { RadioButton } from "./RadioButton";

interface RadioButtonGroupProps {
  values: string[];
  title: string;
  defaultValue?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  values,
  title,
  defaultValue,
}) => {
  const [optionSelected, setOptionSelected] = React.useState(
    defaultValue === null || defaultValue === undefined
      ? values[0]
      : defaultValue
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionSelected(event.target.value);
  };

  const getButtons = () => {
    return values.map((item, index: number) => (
      <RadioButton
        value={item}
        key={index}
        title={title}
        optionSelected={optionSelected}
        handleChange={handleChange}
      />
    ));
  };
  return <div className="radio-button-group">{getButtons()}</div>;
};

export default RadioButtonGroup;
