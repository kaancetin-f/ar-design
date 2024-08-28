import { Colors } from "../../../libs/types/Colors";

export type ParagraphColors =
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-800"
  | "gray-900";

export type Props = {
  children: string;
  color?: ParagraphColors | Colors;
  align?: "left" | "center" | "right";
  upperCase?: boolean;
};
