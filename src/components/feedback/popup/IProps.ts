import { PopupButtonProps, Status } from "../../../libs/core/application/contexts/Notification";

interface IProps {
  title: string;
  message?: string;
  status: Status | number;
  isOpen: boolean;
  buttons?: PopupButtonProps | null;
}

export default IProps;
