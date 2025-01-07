import React from "react";
import IButtonProps from "../button/IProps";
import { Variants } from "../../../libs/types";
import { IGlobalProps, ISizes, IValidation } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "disabled">,
    ISizes,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size">,
    IValidation {
  button?: IButtonProps;
  addon?: { variant?: Variants; before?: string | number; after?: string | number };
  upperCase?: boolean;
}

export default IProps;
