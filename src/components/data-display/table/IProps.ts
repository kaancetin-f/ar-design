import React from "react";
import { AllowedTypes, TableColumnType } from "../../../libs/types";
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
};

type ImportActionType = {
  tooltip: string;
  allowedTypes?: AllowedTypes[];
  prefixItem?: React.ReactNode;
  suffixItem?: React.ReactNode;
  onClick: (formData: FormData | undefined, files: File[]) => void;
};

type CreateActionType = {
  tooltip: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

interface IProps<T> extends IChildren {
  title?: string;
  description?: string;
  data: T[];
  columns: TableColumnType<T>[];
  actions?: {
    import?: ImportActionType;
    create?: CreateActionType;
  };
  selections?: (selectionItems: T[]) => void;
  previousSelections?: T[];
  searchedParams?: (params: SearchedParam | null, query: string, operator: FilterOperator) => void;
  pagination?: {
    totalRecords: number;
    perPage: number;
    onChange?: (currentPage: number) => void;
  };
  config?: Config;
}

export default IProps;
