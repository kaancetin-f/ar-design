import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  title?: string;
  message?: string;
  content?: React.JSX.Element;
  onConfirm?: (confirm: boolean) => void;
  windowBlur?: boolean;
  config?: {
    buttons: { okButton: string; cancelButton: string };
  };
}

export default IProps;
