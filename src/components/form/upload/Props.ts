import { IValidation } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  files: FormData[];
  onChange: (files: FormData) => void;
  multiple: true;
}

interface ISingle {
  files: FormData | undefined;
  onChange: (files: FormData | undefined) => void;
  multiple?: false;
}

type Props = {
  disabled?: boolean;
} & (IMultiple | ISingle) &
  IValidation;

export default Props;
