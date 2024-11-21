"use client";

import React, { useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/steps/steps.css";
import Typography from "../../data-display/typography";

const { Title } = Typography;

const Steps: React.FC<IProps> = ({ steps = [], onChange }) => {
  // states
  const [currentStep, setCurrentStep] = useState<number>(0);

  // methods
  const changeItemIcon = (currentStep: number, index: number) => {
    if (currentStep < index) return "pending";
    else if (currentStep === index) return "in-progress";
    else if (currentStep > index) return "completed";
    else return "";
  };

  return (
    <div className="ar-steps">
      <div className="steps">
        {steps.length > 0 &&
          steps.map((step, index) => {
            let itemIcon: string[] = ["item-icon"];

            itemIcon.push(changeItemIcon(currentStep, index));

            return (
              <div
                key={step.title || index}
                className="item"
                onClick={() => {
                  setCurrentStep(index);
                  onChange(index + 1);
                }}
              >
                <div className={itemIcon.map((c) => c).join(" ")}>
                  <span className={changeItemIcon(currentStep, index)}></span>
                </div>
                <div className="item-informations">
                  <span className="step">STEP {index + 1}</span>
                  <Title Level="h3">{step.title}</Title>
                </div>
              </div>
            );
          })}
      </div>

      <div className="content">{steps.map((step, index) => currentStep === index && step.content)}</div>
    </div>
  );
};

export default Steps;
