import React from "react";

export type Variants = "filled" | "outlined" | "dashed" | "borderless";
export type Status = "primary" | "secondary" | "success" | "danger" | "warning" | "information" | "dark" | "light";

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

export type Border = { radius: BorderRadiuses };
export type BorderRadiuses = "sm" | "lg" | "xl" | "xxl" | "pill" | "none";

export type Icon = {
  element: React.JSX.Element;
  position?: "start" | "end";
};

export type Sizes = "large" | "normal" | "small";

export type Option = { value: string | number; text: string };

// Menu Types
export type MenuProps = {
  render?: string | React.JSX.Element;
  type?: MenuItemType;
  icon?: React.ReactElement<SVGElement | HTMLImageElement>;
  submenu?: MenuProps[];
};
export type MenuItemVariants = "vertical" | "horizontal";
export type MenuItemType = "group" | "divider";

// Table Types
export type TableColumnType<T> = {
  title: string;
  key?: keyof T | { field: keyof T; nestedKey: string };
  render?: (item: T) => React.ReactNode;
  config?: {
    width?: number;
    alignContent?: "left" | "center" | "right";
    sticky?: "left" | "right";
    textWrap?: "wrap" | "nowrap";
  };
};

// Step Types
export type StepProps = {
  title: string;
  content: React.ReactNode;
};
export type TabProps = {
  title: string;
  content: React.ReactNode;
};

// Validation Types
export type ValidationProperties<T> = {
  key: keyof T;
  subkey?: string;
  step?: number;
  shape?: {
    type: "required" | "minimum" | "maximum" | "email";
    value?: string | number;
    message: string;
  }[];
  where?: (param: T) => boolean;
};
export type Errors<TData> = Partial<{ [key in keyof TData]: string }>;

// Charts
// Pie
export type PieChartDataType = { value: number; text: string };
