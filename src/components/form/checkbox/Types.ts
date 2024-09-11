import React from "react";
import { Colors } from "../../../libs/types/Colors";
import { Variants } from "../../../libs/types/Variants";

type Props = {
  label?: string;
  variant?: Variants;
  status?: Colors;
  border?: {
    radius: "sm" | "pill";
  };
} & React.InputHTMLAttributes<HTMLInputElement>;

export { Props };
