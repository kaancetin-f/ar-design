import { IBorder, IChildren, IColors, IIcon, ISize, IUpperCase, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IChildren,
    IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  shape?: "circle" | "square";
  position?: {
    type: "fixed" | "absolute";
    inset: ("top" | "right" | "bottom" | "left")[];
  };
  fullWidth?: boolean;
}

export default IProps;
