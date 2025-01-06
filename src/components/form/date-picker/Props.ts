import React from "react";
import { IGlobalProps, IValidation } from "../../../libs/types/IGlobalProps";

type Props = {
  label?: string;
  isClock?: boolean;
  onChange: (value: string) => void;
} & Omit<IGlobalProps, "children" | "icon" | "upperCase" | "disabled"> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "size"> &
  IValidation;

export default Props;
