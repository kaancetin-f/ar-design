import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  title?: string;
  message?: string;
  content?: React.JSX.Element;
  onConfirm?: (confirm: boolean) => void;
  windowBlur?: boolean;
}

export default IProps;
