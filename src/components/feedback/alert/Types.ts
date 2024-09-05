import { Colors } from "../../../libs/types/Colors";

type message = string | message[];

export type Props = {
  message: message;
  type: Colors | "transparent";
  border?: boolean;
  emphasize?: string[];
};
