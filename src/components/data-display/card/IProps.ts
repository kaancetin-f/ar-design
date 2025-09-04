import { IChildren, IStatus, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren, IVariant<{ component: "card" }>, IStatus<{ component: "card" }> {
  title?: string;
  actions?: React.JSX.Element;
}

export default IProps;
