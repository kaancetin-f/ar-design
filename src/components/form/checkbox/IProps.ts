import React from "react";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "icon" | "disabled">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "type" | "size"> {
  label?: string;
}

export default IProps;
