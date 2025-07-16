import React from "react";

export type Variants = "filled" | "surface" | "outlined" | "dashed" | "borderless";
export type Status =
  | "primary"
  | "primary-light"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "information"
  | "dark"
  | "light";
export type Color =
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "gray"
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

export type Border = { radius: BorderRadiuses };
export type BorderRadiuses = "sm" | "lg" | "xl" | "xxl" | "pill" | "none";

export type Icon = {
  element: React.JSX.Element;
  position?: "start" | "end";
};

export type Sizes = "large" | "normal" | "small";

export type Option = { value: string | number | null; text: string };

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
  filters?: Option[];
  render?: (item: T) => React.ReactNode;
  config?: {
    width?: number;
    alignContent?: "left" | "center" | "right";
    sticky?: "left" | "right";
    textWrap?: "wrap" | "nowrap";
  };
};
export type HTMLTableElementWithCustomAttributes = {
  filterCleaner: () => void;
} & HTMLTableElement;

// Step Types
export type StepProps = {
  title: string;
  content: React.ReactNode;
};
export type TabProps = {
  title: string;
  content: React.ReactNode;
  config?: { canBeClosed: boolean };
};

// Validation Types
export type ValidationShape = {
  type: "required" | "minimum" | "maximum" | "email";
  value?: string | number;
  message: string;
};
export type ValidationProperties<T> = {
  key: keyof T;
  subkey?: string;
  step?: number;
  shape?: ValidationShape[];
  where?: (param: T) => boolean;
};
export type Errors<TData> = Partial<{ [key in keyof TData]: string }>;

// Upload
export type MimeTypes =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/zip"
  | "application/x-rar-compressed"
  | "application/x-7z-compressed"
  | "application/gzip"
  | "application/json"
  | "application/xml"
  | "text/plain"
  | "text/csv"
  | "text/html"
  | "video/mp4"
  | "video/quicktime"
  | "video/x-msvideo"
  | "video/x-matroska"
  | "video/webm"
  | "video/x-flv"
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | "audio/aac"
  | "audio/flac"
  | "application/octet-stream";
export type FileCategory =
  | "image"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "archive"
  | "text"
  | "video"
  | "audio"
  | "json"
  | "xml"
  | "binary"
  | "other";
// Icons
export type IconVariants = "linear" | "fill";
export type Icons =
  | "Add"
  | "ArrowLeft"
  | "ArrowRight"
  | "Bold"
  | "BulletList"
  | "CloseCircle"
  | "CloseSquare"
  | "CloudUpload"
  | "Document"
  | "Drive"
  | "ExclamationCircle"
  | "ExclamationDiamond"
  | "Eye"
  | "File"
  | "Filter"
  | "Folder"
  | "Image"
  | "Import"
  | "Italic"
  | "NumberList"
  | "Strikethrough"
  | "Success"
  | "TextAlingCenter"
  | "TextAlingLeft"
  | "TextAlingRight"
  | "TickCircle"
  | "Trash"
  | "Underline"
  | "Upload"
  | "Download"
  | "Warning"
  | "FileTypeXlsx"
  | "FileTypeXls"
  | "FileTypeCsv"
  | "FileTypeDoc"
  | "FileTypeDocx"
  | "FileTypePdf"
  | "FileTypePptx"
  | "FileTypeZip"
  | "FileTypeTxt"
  | "FileTypeHtml"
  | "FileTypeJson"
  | "FileTypeXml"
  | "CameraReels"
  | "FileEarmark";
// Charts
// Pie
export type PieChartDataType = { value: number; text: string };
