import { IBorder, IColors, IValidation, IVariant } from "../../../../libs/types/IGlobalProps";
import { Option } from "../../../../libs/types";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color">,
    IVariant,
    IColors,
    IBorder,
    IValidation {
  options: Option[];
  values: { option: string; value: string | number | readonly string[] | undefined };
  onSelected: (option: Option | undefined) => void;
}

export default IProps;
