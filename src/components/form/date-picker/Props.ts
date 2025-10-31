import { IBorder, IColors, IStatus, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

type Props = {
  label?: string;
  isClock?: boolean;
  onChange: (value: string) => void;
} & IVariant &
  IColors &
  IStatus &
  IBorder &
  IValidation &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "color">;

export default Props;
