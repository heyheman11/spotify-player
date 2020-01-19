import * as React from "react";
import { RadioButton } from "./RadioButton";

const RadioButtonGroup = ({ values, title, defaultValue }) => {
  const [optionSelected, setOptionSelected] = React.useState(
    defaultValue === null || defaultValue === undefined
      ? values[0]
      : defaultValue
  );

  const handleChange = (event: React.ChangeEvent) => {
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

// RadioButtonGroup.propTypes = {
//   values: PropTypes.arrayOf(PropTypes.string),
//   title: PropTypes.string,
//   defaultValue: PropTypes.string
// };

export default RadioButtonGroup;
