interface IProps {
  buttons: {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }[];
}

export default IProps;
