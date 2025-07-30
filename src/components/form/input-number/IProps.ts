import { IBorder, IColors, ISize, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IColors,
    IBorder,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color" | "type"> {}

export default IProps;
