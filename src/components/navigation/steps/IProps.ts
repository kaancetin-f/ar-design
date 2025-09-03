import { StepProps, ValidationProperties } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps<TData extends object> extends IChildren {
  steps: StepProps[];
  onChange: (currentStep: number) => void;
  validation?: {
    data: TData;
    rules: ValidationProperties<TData>[];
  };
}

export default IProps;
