import { IBorder, IColors, IDisabled, IPlaceholder, IValidation, IVariant } from "../../../../libs/types/IGlobalProps";
import { Option } from "../../../../libs/types";

interface IProps extends IVariant, IColors, IBorder, IValidation, IPlaceholder, IDisabled {
  name: string;
  values: { option: string; value: string | number | readonly string[] | undefined };
  onSelected: (option: Option | undefined) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default IProps;
