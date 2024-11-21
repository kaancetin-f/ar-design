import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../contexts/Config";
import { NotificationContext, Status } from "../contexts/Notification";
import Utils from "../../../infrastructure/shared/Utils";
import { ValidationProperties } from "../../../types";

export const useLayout = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};

export const useNotification = () => {
  // contexts
  const { setTitle, setMessage, setStatus, setTrigger } = useContext(NotificationContext);

  // methods
  const notification = ({ title, message, status }: { title: string; message?: string; status: Status }) => {
    setTitle && setTitle(title);
    setMessage && setMessage(message ?? "");
    setStatus && setStatus(status);
    setTrigger && setTrigger((trigger) => !trigger);
  };

  return { notification };
};

export const useValidation = function <TData extends object>(data: TData, params: ValidationProperties<TData>[]) {
  // states
  const [errors, setErrors] = useState<Partial<{ [key in keyof TData]: string }>>({});
  const [trigger, setTrigger] = useState<boolean>(false);

  // methods
  const onSubmit = (callback: (result: boolean) => void): void => {
    setTrigger(true);

    let result: boolean = true;

    if (!data || Object.keys(data).length === 0 || params.length === 0) result = false;
    else if (Object.keys(errors).length > 0) result = false;
    else setTrigger(false);

    callback(result);
  };

  // useEffects
  useEffect(() => {
    if (!trigger) return;

    setErrors({});

    params.forEach((param) => {
      const value = data[param.key as keyof typeof data] as string;

      param.shape?.forEach((s) => {
        if (param.where) {
          if (s.type === "required" && param.where(data)) {
            Utils.IsNullOrEmpty(value) ? setErrors((prev) => ({ ...prev, [param.key]: s.message })) : null;
          }
        } else {
          if (s.type === "required") {
            Utils.IsNullOrEmpty(value) ? setErrors((prev) => ({ ...prev, [param.key]: s.message })) : null;
          }

          if (s.type === "minimum") {
            value && value.length < (s.value as number)
              ? setErrors((prev) => ({ ...prev, [param.key]: Utils.StringFormat(s.message, s.value, 4) }))
              : null;
          }

          if (s.type === "maximum") {
            value && value.length > (s.value as number)
              ? setErrors((prev) => ({ ...prev, [param.key]: Utils.StringFormat(s.message, s.value) }))
              : null;
          }

          if (s.type === "email") {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

            !regex && Utils.IsNullOrEmpty(value) ? setErrors((prev) => ({ ...prev, [param.key]: s.message })) : null;
          }
        }
      });
    });
  }, [trigger, data]);

  return {
    onSubmit,
    errors,
  };
};
