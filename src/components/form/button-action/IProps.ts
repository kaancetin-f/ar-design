import Button from "../button";

interface IProps {
  // children: React.ReactElement<typeof Button> | React.ReactElement<typeof Button>[];
  buttons: {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }[];
}

export default IProps;
