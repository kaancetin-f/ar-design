import { KanbanBoardColumnType } from "../../../libs/types";

interface IProps<T> {
  trackBy: (item: T) => string;
  columns: KanbanBoardColumnType<T>[];
  onChange?: (item: T, columnKey: string, hoverIndex: number) => void;
}

export default IProps;
