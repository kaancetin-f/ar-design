import { Colors } from "../../../libs/types/Colors";
import { Variants } from "../../../libs/types/Variants";

export type Option = { value: string | number; text: string };

type Multiple = {
  status?: { color?: Colors; selected?: Colors };
  onChange: (option: Option[]) => void;
  multiple: true;
};
type Single = { status?: Colors; onChange: (option: Option | undefined) => void; multiple?: false };

export type Props = {
  variant?: Variants;
  border?: {
    radius: "sm" | "lg" | "xl" | "xxl" | "pill" | "none";
  };
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
} & (Multiple | Single);
