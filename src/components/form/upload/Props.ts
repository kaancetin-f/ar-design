import { IValidation } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  file: FormData[];
  onChange: (formData: FormData, files: File[]) => void;
  multiple: true;
}

interface ISingle {
  file: FormData | undefined;
  onChange: (formData: FormData | undefined, files: File | null) => void;
  multiple?: false;
}

type Props = {
  disabled?: boolean;
} & (IMultiple | ISingle) &
  IValidation;

export default Props;
