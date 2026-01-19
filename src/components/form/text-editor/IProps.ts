import { IColors, IDisabled, IValidation } from "../../../libs/types/IGlobalProps";

export interface IProps<T> extends IValidation, IColors, IDisabled {
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  dynamicList?: {
    render: {
      display: keyof T;
      items: T[];
    };
    triggerKey?: string;
    onTagged: (tagged: any[]) => void;
  };
  height?: number;
  multilang?: boolean;
  placeholder?: string;
}

export default IProps;
