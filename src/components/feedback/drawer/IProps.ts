import { TabProps, ValidationProperties } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps<T extends object> extends IChildren {
  title?: string;
  tabs: TabProps[];
  activeTab?: number;
  open: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  validation?: {
    data: T;
    rules: ValidationProperties<T>[];
  };
  onChange?: (currentTab: number) => void;
  onClose?: (closeTab: number) => void;
}

export default IProps;
