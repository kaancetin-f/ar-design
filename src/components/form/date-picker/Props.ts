import React from "react";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

type Props = {
  label?: string;
  isClock?: boolean;
  onChange: (value: string) => void;
} & Omit<IGlobalProps, "children" | "icon" | "upperCase" | "disabled"> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "size">;

export default Props;
