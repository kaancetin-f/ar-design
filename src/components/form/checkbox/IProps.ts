import React from "react";
import { IGlobalProps, ISizes } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "icon" | "disabled">,
    ISizes,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "type" | "size"> {
  label?: string;
}

export default IProps;
