import IButtonProps from "../button/IProps";
import { Variants } from "../../../libs/types";
import { IBorder, IColors, IIcon, ISize, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color"> {
  button?: Omit<IButtonProps, "size" | "shape" | "position" | "fullWidth">;
  addon?: { variant?: Variants; before?: string | number; after?: string | number };
}

export default IProps;
