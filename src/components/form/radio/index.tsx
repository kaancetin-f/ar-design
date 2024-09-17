import React from "react";
import { Props } from "./Types";
import Checkbox from "../checkbox";

const Radio: React.FC<Props> = ({
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
