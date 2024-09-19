import React from "react";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  label?: string;
}

export default IProps;
