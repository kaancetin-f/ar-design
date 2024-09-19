import { Status, Variants, Option } from "../../../libs/types";
import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  status?: {
    color?: Status;
    selected?: {
      variant?: Variants;
      color?: Status;
    };
  };
  defaultValueIndex?: number[];
  onChange: (option: Option[]) => void;
  multiple: true;
}

interface ISingle {
  status?: Status;
  defaultValueIndex?: number;
  onChange: (option: Option | undefined) => void;
  multiple?: false;
}

export type Props = {
  options: Option[];
  placeholder?: string;
} & (IMultiple | ISingle) &
  Omit<IGlobalProps, "children">;
