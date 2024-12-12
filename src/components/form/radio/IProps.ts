import React from "react";
import { IGlobalProps, ISizes } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children">,
    ISizes,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  label?: string;
}

export default IProps;
