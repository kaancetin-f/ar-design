import { StepProps } from "../../../libs/types";

interface IProps {
  steps: StepProps[];
  onChange: (currentStep: number) => void;
}

export default IProps;
