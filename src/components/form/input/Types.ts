import React from "react";
import { Props as ButtonProps } from "../button/Types";

type Props = {
  variant?: "filled" | "outlined" | "borderless";
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
