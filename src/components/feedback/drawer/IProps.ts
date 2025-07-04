import { TabProps } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  title?: string;
  tabs: TabProps[];
  activeTab?: number;
  open: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  onChange?: (currentTab: number) => void;
  onClose?: (closeTab: number) => void;
}

export default IProps;
