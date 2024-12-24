import { IValidation } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  file: FormData[];
  onChange: (files: FormData) => void;
  multiple: true;
}

interface ISingle {
  file: FormData | undefined;
  onChange: (file: FormData | undefined) => void;
  multiple?: false;
}

type Props = {
  disabled?: boolean;
} & (IMultiple | ISingle) &
  IValidation;

export default Props;
