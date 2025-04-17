import React from "react";
import { IGlobalProps, ISizes } from "../../../libs/types/IGlobalProps";
import { Status } from "../../../libs/types";

interface IProps
  extends Omit<IGlobalProps, "children">,
    ISizes,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  label?: string;
  trace?: { color: Status };
}

export default IProps;
