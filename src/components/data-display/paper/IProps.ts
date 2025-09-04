import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  title?: string;
  action?: React.ReactNode;
}

export default IProps;
