import { IBorder, IChildren, IStatus, IVariant } from "../../../libs/types/IGlobalProps";

type message = string | message[];

interface IProps extends IChildren, IVariant<{ component: "alert" }>, IStatus<{ component: "alert" }>, IBorder {
  message?: message;
  emphasize?: string[];
}

export default IProps;
