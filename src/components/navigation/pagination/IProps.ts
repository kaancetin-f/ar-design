interface IProps {
  defaultCurrent?: number;
  perPage?: number;
  total: number;
  onChange: (page: number, perPage: number) => void;
}

export default IProps;
