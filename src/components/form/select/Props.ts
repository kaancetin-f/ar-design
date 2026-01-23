import { Variants, Option, Status, Color } from "../../../libs/types";
import {
  IBorder,
  IDisabled,
  IIcon,
  ISize,
  IColors,
  IUpperCase,
  IValidation,
  IVariant,
} from "../../../libs/types/IGlobalProps";

export interface IMultiple {
  status?: {
    color?: Color;
    selected?: {
      variant?: Variants;
      color?: Color;
    };
  };
  value: Option[];
  onChange: (option: Option[]) => void;
  multiple: true;
}

export interface ISingle {
  status?: Status;
  value: Option | undefined;
  onChange: (option: Option | undefined) => void;
  multiple?: false;
}

export type Props = {
  style?: React.CSSProperties | undefined;
  options: Option[];
  onSearch?: (searchText: string) => void;
  onClick?: () => void;
  onCreate?: (option: Option) => void;
  placeholder?: string;
  readOnly?: boolean;
  config?: {
    clear?: boolean;
  };
} & (IMultiple | ISingle) &
  IVariant &
  IColors &
  IBorder &
  IIcon &
  ISize &
  IUpperCase &
  IValidation &
  IDisabled;
