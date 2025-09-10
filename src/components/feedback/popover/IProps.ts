import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  title?: string;
  message?: string;
  content?: React.JSX.Element;
  onConfirm?: (confirm: boolean) => void;
  windowBlur?: boolean;
  fullWidth?: boolean;
  config?: {
    buttons: {
      okay: string;
      cancel?: string;
    };
  };
}

export default IProps;
