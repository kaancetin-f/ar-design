import React from "react";
import IButtonProps from "../button/IProps";
import { Variants } from "../../../libs/types";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "disabled">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  button?: IButtonProps;
  addon?: { variant?: Variants; before?: string | number; after?: string | number };
}

export default IProps;
