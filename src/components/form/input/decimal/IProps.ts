import {
  IBorder,
  IColors,
  IDisabled,
  IPlaceholder,
  IUpperCase,
  IValidation,
  IVariant,
} from "../../../../libs/types/IGlobalProps";

interface IProps extends IVariant, IColors, IBorder, IUpperCase, IValidation, IPlaceholder, IDisabled {
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default IProps;
