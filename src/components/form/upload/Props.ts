import { AllowedTypes } from "../../../libs/types";
import { IValidation } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  file: File[];
  onChange: (formData: FormData, files: File[], isInvalidFileExist: boolean) => void;
  multiple: true;
}

interface ISingle {
  file: File | undefined;
  onChange: (formData: FormData | undefined, files: File | null) => void;
  multiple?: false;
}

type Props = {
  text: string;
  allowedTypes?: AllowedTypes[];
  maxSize?: number;
  disabled?: boolean;
} & (IMultiple | ISingle) &
  IValidation;

export default Props;
