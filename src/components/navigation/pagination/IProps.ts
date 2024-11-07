interface IProps {
  defaultCurrent?: number;
  totalRecords: number;
  perPage?: number;
  onChange: (currentPage: number) => void;
}

export default IProps;
