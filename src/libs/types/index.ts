// // Navigation
// import type { MenuProps } from "../../components/navigation/menu/Types";

export type Variants = "filled" | "outlined" | "dashed" | "borderless";

export type MenuItemVariants = "vertical" | "horizontal";

export type Status =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "information"
  | "dark"
  | "light";

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

export type BorderRadiuses = "sm" | "lg" | "xl" | "xxl" | "pill" | "none";

export type Sizes = "large" | "normal" | "small";

export type Option = { value: string | number; text: string };
