import { IChildren, IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps extends IGlobalProps, IChildren {
  title?: string;
}

export default IProps;
