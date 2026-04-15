import { StepProps, ValidationProperties } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps<TData extends object> extends IChildren {
  name: string;
  steps: StepProps[];
  currentStep?: number;
  onChange: (currentStep: number) => void;
  validation?: {
    data: TData;
    rules: ValidationProperties<TData>[];
  };
  config?: {
    isAutomatic?: boolean;
  };
}

export default IProps;
