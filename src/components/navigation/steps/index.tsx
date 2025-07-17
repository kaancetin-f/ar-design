"use client";

import React, { useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/steps/styles.css";
import Typography from "../../data-display/typography";
import Button from "../../form/button";
import { useValidation } from "../../../libs/core/application/hooks";
import { Errors } from "../../../libs/types";

const { Title } = Typography;

const Steps = function <T extends object>({ children, steps = [], onChange, validation }: IProps<T>) {
  // states
  const [currentStep, setCurrentStep] = useState<number>(0);

  let _errors: Errors<T>;
  let _onSubmit: (callback: (result: boolean) => void) => void;
  let _setSubmit: React.Dispatch<React.SetStateAction<boolean>>;

  if (validation) {
    const { errors, onSubmit, setSubmit } = useValidation(validation.data, validation.rules, currentStep + 1);

    _errors = errors;
    _onSubmit = onSubmit;
    _setSubmit = setSubmit;
  }

  // methods
  const getStepIconStatus = (currentStep: number, index: number) => {
    if (currentStep < index) return "pending";
    if (currentStep === index) return "in-progress";
    return "completed";
  };

  // useEffects
  useEffect(() => onChange(0), []);

  return (
    <div className="ar-steps">
      <div className="steps">
        {steps.length > 0 &&
          steps.map((step, index) => {
            let itemIcon: string[] = ["item-icon"];

            itemIcon.push(getStepIconStatus(currentStep, index));

            return (
              <div
                key={step.title || index}
                className="item"
                onClick={() => {
                  if (validation) {
                    _onSubmit((result) => {
                      if (!result) return;

                      setCurrentStep(index);
                      onChange(index);
                      _setSubmit(false);
                    });
                  } else {
                    setCurrentStep(index);
                    onChange(index);
                  }
                }}
              >
                <div className={itemIcon.map((c) => c).join(" ")}>
                  <span className={getStepIconStatus(currentStep, index)}></span>
                </div>
                <div className="item-informations">
                  <span className="step">STEP {index + 1}</span>
                  <Title Level="h3">{step.title}</Title>
                </div>
              </div>
            );
          })}
      </div>

      <div className="content">
        {steps.map((step, stepIndex) => {
          return (
            <div key={stepIndex}>
              {React.Children.map(step.content, (child) => {
                if (React.isValidElement(child) && stepIndex === currentStep) {
                  return validation
                    ? React.cloneElement(child as React.ReactElement, {
                        errors: _errors,
                      })
                    : child;
                }

                return null;
              })}
            </div>
          );
        })}

        <div className="buttons">
          {currentStep > 0 && (
            <Button
              color="blue"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
                onChange(currentStep - 1);
              }}
            >
              Geri
            </Button>
          )}

          {children && children}

          {currentStep < steps.length - 1 && (
            <Button
              color="blue"
              onClick={() => {
                if (validation) {
                  _onSubmit((result) => {
                    if (!result) return;

                    setCurrentStep((prev) => prev + 1);
                    onChange(currentStep + 1);

                    _setSubmit(false);
                  });
                } else {
                  setCurrentStep((prev) => prev + 1);
                  onChange(currentStep + 1);
                }
              }}
            >
              İleri
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Steps;
