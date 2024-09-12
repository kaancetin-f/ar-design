import { BorderRadiuses } from "../../../libs/types/BorderRadius";
import { Colors } from "../../../libs/types/Colors";
import { Variants } from "../../../libs/types/Variants";

export type Props = {
  variant?: Variants;
  color?: Colors;
  border?: {
    style?: "solid" | "dashed" | "none";
    radius?: BorderRadiuses;
  };
  text: string;
};
