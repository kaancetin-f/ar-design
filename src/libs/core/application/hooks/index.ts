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

type Error = { [key: string]: string; type: string }[];

export const useValidation = function <TData extends object>(data: TData, params: ValidationProperties<TData>[]) {
  // useStates
  const [submit, setSubmit] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Error>([]);

  // methods
  const showErrors = (errors: Error, field: string) => {
    const _errors = errors.filter((error) => error[field]);

    if (_errors.length === 0) return null;

    return _errors.map((error) => error[field]);
  };

  // useEffects
  useEffect(() => {
    if (!data || Object.keys(data).length === 0 || params.length === 0) return;

    setErrors([]);

    params.forEach((param) => {
      const value = data[param.key as keyof typeof data] as string;

      param.shape?.forEach((s) => {
        if (s.type === "required") {
          !value ? setErrors((errors) => [...errors, { [param.key]: s.message, type: s.type }]) : null;
        }

        if (s.type === "minimum") {
          value && value.length < (s.value as number)
            ? setErrors((errors) => [
                ...errors,
                {
                  [param.key]: Utils.StringFormat(s.message, s.value, 4),
                  type: s.type,
                },
              ])
            : null;
        }

        if (s.type === "maximum") {
          value && value.length > (s.value as number)
            ? setErrors((errors) => [
                ...errors,
                {
                  [param.key]: Utils.StringFormat(s.message, s.value),
                  type: s.type,
                },
              ])
            : null;
        }

        if (s.type === "email") {
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

          !regex && value ? setErrors((errors) => [...errors, { [param.key]: s.message, type: s.type }]) : null;
        }
      });
    });
  }, [data]);

  return {
    submit,
    setSubmit,
    success,
    setSuccess,
    message,
    setMessage,
    errors,
    showErrors,
  };
};
