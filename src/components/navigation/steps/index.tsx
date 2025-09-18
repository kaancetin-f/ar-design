"use client";

import React, { useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/steps/styles.css";
import Typography from "../../data-display/typography";
import Button from "../../form/button";
import { useValidation } from "../../../libs/core/application/hooks";
import { ValidationProperties } from "../../../libs/types";

const { Title } = Typography;

const Steps = function <T extends object>({ children, name, steps = [], onChange, validation }: IProps<T>) {
  // states
  const [currentStep, setCurrentStep] = useState<number>(0);

  // hooks
  const { errors, onSubmit, setSubmit } = useValidation(
    validation?.data as T,
    validation?.rules as ValidationProperties<T>[],
    currentStep + 1
  );

  // methods
  const getStepIconStatus = (currentStep: number, index: number) => {
    if (currentStep < index) return "pending";
    if (currentStep === index) return "in-progress";
    return "completed";
  };

  // useEffects
  useEffect(() => {
    const key = `${window.location.pathname}::${name}`;
    const stored = sessionStorage.getItem(key);

    setCurrentStep(stored !== null ? Number(stored) : 0);
    onChange?.(stored !== null ? Number(stored) : 0);
  }, []);

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
                    onSubmit((result) => {
                      if (!result) return;

                      setCurrentStep(index);
                      onChange(index);
                      setSubmit(false);
                    });
                  } else {
                    setCurrentStep(index);
                    onChange(index);
                  }

                  const key = `${window.location.pathname}::${name}`;
                  sessionStorage.setItem(key, String(index));
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
                        errors: errors,
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
                  onSubmit((result) => {
                    if (!result) return;

                    setCurrentStep((prev) => prev + 1);
                    onChange(currentStep + 1);
                    setSubmit(false);
                  });
                } else {
                  setCurrentStep((prev) => prev + 1);
                  onChange(currentStep + 1);
                }

                const key = `${window.location.pathname}::${name}`;
                sessionStorage.setItem(key, String(currentStep + 1));
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
