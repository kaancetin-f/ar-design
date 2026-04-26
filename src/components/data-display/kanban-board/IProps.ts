import { KanbanBoardColumnType } from "../../../libs/types";

export type Config<T extends object> = {
  locale?: Intl.LocalesArgument;
  safeAreaOffset?: { top?: number; right?: number; bottom?: number; left?: number };
  perPage?: number;
  filter?: {
    search?: (item: T, value: string) => boolean;
    keys: (item: T) => { name: string; key: string; type: "select" | "date" }[];
  };
};

interface IProps<T extends object, TColumnProperties> {
  trackBy: (item: T) => string;
  columns: KanbanBoardColumnType<T, TColumnProperties>[];
  onChange?: (item: T, columnKey: string, columnProperties: TColumnProperties, hoverIndex: number) => void;
  onLazy?: (perPage: number) => void;
  config?: Config<T>;
}

export default IProps;
