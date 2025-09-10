import { IChildren, ISize } from "../../../libs/types/IGlobalProps";
import IPopoverProps from "../../feedback/popover/IProps";

interface IProps extends IChildren, ISize, React.HTMLAttributes<HTMLDivElement> {
  open: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  closePopover?: IPopoverProps;
  title?: string;
  footer?: React.ReactNode;
  disableCloseOnBackdrop?: boolean;
  disableCloseOnEsc?: boolean;
}

export default IProps;
