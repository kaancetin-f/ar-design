import { IChildren, IGlobalProps } from "../../../../libs/types/IGlobalProps";

interface IProps extends Omit<IGlobalProps, "size">, IChildren {
  Level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  size?:
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "xxx-large"
    | "smaller"
    | "larger";
}

export default IProps;
