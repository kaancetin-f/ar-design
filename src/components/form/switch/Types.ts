import { Colors } from "../../../libs/types";

export type Props = {
  label?: string;
  status?: Colors;
  border?: {
    radius: "sm" | "pill";
  };
} & React.InputHTMLAttributes<HTMLInputElement>;
