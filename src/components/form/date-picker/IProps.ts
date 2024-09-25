import React from "react";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "icon" | "upperCase" | "disabled">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  label?: string;
  format?: "mm/dd/yyyy" | "yyyy-mm-dd";
}

export default IProps;
