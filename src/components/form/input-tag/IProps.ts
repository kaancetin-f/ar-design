import { IBorder, IIcon, ISize, IStatus, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IStatus,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color"> {}

export default IProps;
