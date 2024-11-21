import { Variants, Option, Status } from "../../../libs/types";
import { IGlobalProps, IValidation } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  status?: {
    color?: Status;
    selected?: {
      variant?: Variants;
      color?: Status;
    };
  };
  value: Option[];
  onChange: (option: Option[]) => void;
  multiple: true;
}

interface ISingle {
  status?: Status;
  value: Option | undefined;
  onChange: (option: Option | undefined) => void;
  multiple?: false;
}

export type Props = {
  options: Option[];
  onCreate?: (option: Option) => void;
  placeholder?: string;
  disabled?: boolean;
} & (IMultiple | ISingle) &
  Omit<IGlobalProps, "status"> &
  IValidation;
