import { BorderRadiuses } from "../../../libs/types/BorderRadius";
import { Colors } from "../../../libs/types/Colors";
import { Variants } from "../../../libs/types/Variants";

export type Option = { value: string | number; text: string };

type Multiple = {
  status?: {
    color?: Colors;
    selected?: {
      variant?: Variants;
      color?: Colors;
    };
  };
  onChange: (option: Option[]) => void;
  multiple: true;
};
type Single = { status?: Colors; onChange: (option: Option | undefined) => void; multiple?: false };

export type Props = {
  variant?: Exclude<Variants, "borderless">;
  border?: {
    radius: BorderRadiuses;
  };
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
} & (Multiple | Single);
