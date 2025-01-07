import React from "react";
import { IGlobalProps, ISizes, IValidation } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "disabled">,
    ISizes,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size">,
    IValidation {}

export default IProps;
