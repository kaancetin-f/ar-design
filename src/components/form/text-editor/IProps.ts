import { IValidation } from "../../../libs/types/IGlobalProps";

interface IProps<T> extends IValidation {
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  dynamicList?: {
    render: {
      display: keyof T;
      items: T[];
    };
    triggerKey?: string;
    onTagged?: (tagged: any[]) => void;
  };
  placeholder?: string;
  height?: number;
  multilang?: boolean;
}

export default IProps;
