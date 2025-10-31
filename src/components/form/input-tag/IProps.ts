import { IBorder, IIcon, IStatus, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IStatus,
    IBorder,
    IIcon,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "color"> {}

export default IProps;
