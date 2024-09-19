import { IGlobalProps } from "../../../libs/types/IGlobalProps";

type message = string | message[];

interface IProps extends Omit<IGlobalProps, "variant" | "icon"> {
  message?: message;
  emphasize?: string[];
}

export default IProps;
