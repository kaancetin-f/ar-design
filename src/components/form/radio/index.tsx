import React from "react";
import Checkbox from "../checkbox";
import IProps from "./IProps";

const Radio: React.FC<IProps> = ({
  label,
  variant = "outlined",
  status = "primary",
  ...attributes
}) => {
  return (
    <Checkbox
      label={label}
      variant={variant}
      status={status}
      border={{ radius: "pill" }}
      {...attributes}
      type="radio"
    />
  );
};

Radio.displayName = "Radio";

export default Radio;
