import React from "react";
import { Props } from "./Types";

const Button: React.FC<Props> = ({ children, ...attributes }) => {
  return <button {...attributes}>{children}</button>;
};

export default Button;
