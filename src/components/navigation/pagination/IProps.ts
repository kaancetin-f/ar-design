interface IProps {
  defaultCurrent?: number;
  currentPage: number;
  totalRecords: number;
  perPage?: number;
  onPerPageChange: (perPage: number) => void;
  onChange: (currentPage: number) => void;
}

export default IProps;
