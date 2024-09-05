import React from "react";
import { Props as ButtonProps } from "../button/Types";
import { Colors } from "../../../libs/types/Colors";

type Props = {
  variant?: "filled" | "outlined" | "borderless";
  status?: Colors;
  icon?: {
    element: React.JSX.Element;
    position?: "start" | "end";
  };
  border?: {
    radius: "sm" | "lg" | "xl" | "xxl" | "pill" | "none";
  };
  button?: ButtonProps;
  addon?: { before?: string | number; after?: string | number };
} & React.InputHTMLAttributes<HTMLInputElement>;

export { Props };
