import { PopupButtonProps, Status } from "../../../libs/core/application/contexts/Notification";

interface IProps {
  title: string;
  message?: string;
  status: Status | number;
  isOpen: boolean;
  buttons?: PopupButtonProps | null;
  onConfirm?: ((confirm: boolean) => void) | null;
}

export default IProps;
