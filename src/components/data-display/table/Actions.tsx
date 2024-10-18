import React from "react";
import IProps from "../../form/button/IProps";

const Actions: React.FC<{
  children: React.ReactElement<{
    children: React.ReactElement<IProps> | React.ReactElement<IProps>[];
  }>;
}> = ({ children }) => children;

export default Actions;
