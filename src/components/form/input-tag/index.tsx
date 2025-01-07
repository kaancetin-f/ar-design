import React from "react";
import IProps from "./IProps";
import Input from "../input";

const InputTag: React.FC<IProps> = ({ ...attributes }) => {
  return <Input {...attributes} />;
};

export default InputTag;
