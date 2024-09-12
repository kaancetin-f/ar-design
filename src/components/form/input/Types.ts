import React from "react";
import { Props as ButtonProps } from "../button/Types";
import { Colors } from "../../../libs/types/Colors";
import { Variants } from "../../../libs/types/Variants";

type Props = {
  variant?: Variants;
  status?: Colors;
  icon?: {
    element: React.JSX.Element;
    position?: "start" | "end";
  };
  border?: {
    radius: "sm" | "lg" | "xl" | "xxl" | "pill" | "none";
  };
  button?: ButtonProps;
  addon?: { variant?: Variants; before?: string | number; after?: string | number };
} & React.InputHTMLAttributes<HTMLInputElement>;

export { Props };
