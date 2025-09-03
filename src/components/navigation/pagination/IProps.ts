interface IProps {
  defaultCurrent?: number;
  currentPage: number;
  totalRecords: number;
  perPage?: number;
  onChange: (currentPage: number) => void;
}

export default IProps;
