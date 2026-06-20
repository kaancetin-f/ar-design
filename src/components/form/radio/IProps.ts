import { IBorder, IColors, IIcon, ISize, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";
import { Color } from "../../../libs/types";

interface IProps
  extends
    IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color"> {
  label?: string;
  trace?: { color: Color };
  pastTrace?: { color: Color };
}

export default IProps;
