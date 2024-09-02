import React from "react";
import Button from "../button";
import { Props } from "../button/Types";
import "../../assest/css/button-group/button-group.css";

const ButtonGroup: React.FC<{ children: React.ReactNode }> & { Button: React.FC<Props> } = ({
  children,
}) => {
  return <div className="ar-button-group">{children}</div>;
};

ButtonGroup.Button = Button;

ButtonGroup.displayName = "ButtonGroup";
export default ButtonGroup;
