import { IBorder, IColors, ISize, IStatus, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

type Props = {
  label?: string;
  isClock?: boolean;
  onChange: (value: string) => void;
} & IVariant &
  IColors &
  IStatus &
  IBorder &
  ISize &
  IValidation &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "size" | "color">;

export default Props;
