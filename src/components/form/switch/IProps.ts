import {
  IBorder,
  IColors,
  IDisabled,
  IIcon,
  ISize,
  IUpperCase,
  IValidation,
  IVariant,
} from "../../../libs/types/IGlobalProps";

interface IProps
  extends
    IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    IDisabled,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color"> {
  label?: string;
}

export default IProps;
