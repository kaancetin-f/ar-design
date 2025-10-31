import { IColors, IVariant } from "../../../../libs/types/IGlobalProps";

interface IProps extends IVariant, IColors, Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "color"> {
  character: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default IProps;
