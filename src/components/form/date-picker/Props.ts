import React from "react";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  onChange: (value: { begin: string; end: string }) => void;
  multiple: true;
}
interface ISingle {
  onChange: (value: string) => void;
  multiple?: false;
}

type Props = {
  label?: string;
  format?: "mm/dd/yyyy" | "yyyy-mm-dd";
} & (IMultiple | ISingle) &
  Omit<IGlobalProps, "children" | "icon" | "upperCase" | "disabled"> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "size">;

export default Props;
