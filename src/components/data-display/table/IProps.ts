import React from "react";
import { MimeTypes, TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";
import { FilterOperator } from "../../../libs/infrastructure/shared/Enums";

export type Operator =
  | "Contains"
  | "DoesNotContains"
  | "Equals"
  | "DoesNotEquals"
  | "BeginsWith"
  | "EndsWith"
  | "Blank"
  | "NotBlank";

export type FilterValue = {
  value: string | number | boolean;
  operator: FilterOperator;
};

export type SearchedParam = { [key: string]: FilterValue | FilterValue[] };

export type Config = {
  isServerSide?: boolean;
  isSearchable?: boolean;
  scroll?: {
    maxHeight: number;
  };
  subrow?: {
    openAutomatically?: boolean;
    selector?: string;
    button?: boolean;
  };
  isTreeView?: boolean;
};

type ImportActionType = {
  tooltip: string;
  title?: string;
  message?: string;
  buttonText?: string;
  allowedTypes?: MimeTypes[];
  prefixItem?: React.ReactNode;
  suffixItem?: React.ReactNode;
  onClick: (formData: FormData | undefined, files: File[], base64: string[]) => void;
};

type ExportActionType = {
  tooltip: string;
  title?: string;
  message?: string;
  content?: React.JSX.Element;
  onClick: () => void;
};

type CreateActionType = {
  tooltip: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type DeleteActionType = {
  tooltip: string;
  title?: string;
  message?: string;
  onClick: () => void;
};

interface IProps<T> extends IChildren {
  trackBy?: (item: T) => string;
  title?: string;
  description?: string;
  data: T[];
  columns: TableColumnType<T>[];
  actions?: {
    import?: ImportActionType;
    export?: ExportActionType;
    create?: CreateActionType;
    delete?: DeleteActionType;
  };
  selections?: (selectionItems: T[]) => void;
  previousSelections?: T[];
  searchedParams?: (params: SearchedParam | null, query: string, operator: FilterOperator) => void;
  onEditable?: (item: T, index: number) => void;
  pagination?: {
    totalRecords: number;
    perPage: number;
    onChange?: (currentPage: number) => void;
  };
  config?: Config;
}

export default IProps;
