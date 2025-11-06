import { IBorder, IColors, IStatus, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

type Props = {
  label?: string;
  onChange: (value: string) => void;
  config?: {
    isClock?: boolean;
    isFooterButton?: boolean;
  };
} & IVariant &
  IColors &
  IStatus &
  IBorder &
  IValidation &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "color">;

export default Props;
