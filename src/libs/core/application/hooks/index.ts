import { useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../contexts/Config";
import { NotificationContext, Status } from "../contexts/Notification";
import Utils from "../../../infrastructure/shared/Utils";
import { ValidationProperties } from "../../../types";
import { LanguageContext } from "../contexts/Language";

export const useLayout = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

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
  // refs
  const _errors = useRef<Partial<{ [key in keyof TData]: string }>>({});

  // states
  const [errors, setErrors] = useState<Partial<{ [key in keyof TData]: string }>>({});
  const [submit, setSubmit] = useState<boolean>(false);

  // methods
  const onSubmit = (callback: (result: boolean) => void): void => {
    setSubmit(true);

    setTimeout(() => {
      let result: boolean = true;

      if (!data || Object.keys(data).length === 0 || params.length === 0) result = false;
      if (Object.keys(_errors.current).length > 0) result = false;

      callback(result);
    }, 0);
  };

  const setError = (key: keyof TData, message: string) => {
    setErrors((prev) => ({ ...prev, [key]: message }));
    _errors.current = { ..._errors.current, [key]: message };
  };

  // useEffects
  useEffect(() => {
    if (!submit) return;

    setErrors({});
    _errors.current = {};

    params.forEach((param) => {
      const value = data[param.key as keyof typeof data] as string;

      param.shape?.forEach((s) => {
        if (param.where) {
          if (s.type === "required" && param.where(data)) {
            Utils.IsNullOrEmpty(value) ? setError(param.key, s.message) : null;
          }
        } else {
          if (s.type === "required") {
            Utils.IsNullOrEmpty(value) ? setError(param.key, s.message) : null;
          }

          if (s.type === "minimum") {
            value && value.length < (s.value as number)
              ? setError(param.key, Utils.StringFormat(s.message, s.value))
              : null;
          }

          if (s.type === "maximum") {
            value && value.length > (s.value as number)
              ? setError(param.key, Utils.StringFormat(s.message, s.value))
              : null;
          }

          if (s.type === "email") {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

            !regex && Utils.IsNullOrEmpty(value) ? setError(param.key, s.message) : null;
          }
        }
      });
    });
  }, [submit, data]);

  return {
    onSubmit,
    setSubmit,
    errors,
  };
};

export const useTranslation = function <TBaseLocale>(
  currentLanguage: string | undefined,
  translations: { [key: string]: any }
) {
  const t = (key: keyof TBaseLocale, ...args: any[]) => {
    return Utils.StringFormat(translations[currentLanguage ?? "tr"][key], args) ?? "";
  };

  return { t, currentLanguage };
};
