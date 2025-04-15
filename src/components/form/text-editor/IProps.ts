import { IValidation } from "../../../libs/types/IGlobalProps";

interface IProps extends IValidation {
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
  height?: number;
  multilang?: boolean;
}

export default IProps;
