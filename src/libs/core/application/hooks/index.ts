import { useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../contexts/Config";
import { NotificationContext, Status } from "../contexts/Notification";
import Utils from "../../../infrastructure/shared/Utils";
import { Errors, ValidationProperties } from "../../../types";
import { LanguageContext } from "../contexts/Language";
import { LoadingContext } from "../contexts/Loading";

export const useLayout = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  // if (!context) {
  //   throw new Error("useLayout must be used within a LayoutProvider");
  // }

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

export const useValidation = function <TData extends object>(
  data: TData,
  params: ValidationProperties<TData>[],
  step?: number
) {
  // refs
  const _errors = useRef<Errors<TData>>({});

  // states
  const [errors, setErrors] = useState<Errors<TData>>({});
  const [submit, setSubmit] = useState<boolean>(false);

  // methods
  const onSubmit = (callback: (result: boolean) => void): void => {
    setSubmit(true);

    setTimeout(() => {
      let result: boolean = true;

      if (!data || Object.keys(data).length === 0 || params.length === 0) result = false;
      if (step) {
        const filteredErrors = Object.fromEntries(
          Object.entries(_errors.current)
            .filter(([key]) => key.startsWith(`${step}_`))
            .map(([key, value]) => [key.replace(/^\d+_/, ""), String(value)])
        ) as Errors<TData>;

        if (Object.keys(filteredErrors).length > 0) result = false;
      } else {
        if (Object.keys(_errors.current).length > 0) result = false;
      }

      callback(result);
    }, 0);
  };

  const setError = (key: keyof TData, message: string, step?: number) => {
    const _key = step ? `${step}_${key as string}` : key;

    setErrors((prev) => ({ ...prev, [_key]: message }));
    _errors.current = { ..._errors.current, [_key]: message };
  };

  const handleParams = (param: ValidationProperties<TData>) => {
    const value = data[param.key as keyof typeof data] as string;

    if (param.subkey) {
      const subvalue = data[param.key as keyof typeof data];

      if (param.subkey.includes(".")) {
        let _data: any = subvalue;
        const levels = param.subkey.split(".");

        // "levels.length - 1" çünkü son seviyeye kadar gidip, son seviyedeki değeri alacağız.
        for (let i = 0; i < levels.length; i++) {
          const key = levels[i];

          // Eğer `_data` undefined ya da null ise işlem bitirilsin.
          if (_data === undefined || _data === null) break;

          // `key`'i _data üzerinde kullanarak yeni değeri atıyoruz.
          _data = _data[key as keyof typeof _data];
        }

        // Burada _data son seviyeye ulaşacaktır.
        paramsShape(param, _data);
      }

      return;
    }

    paramsShape(param, value);
  };

  const paramsShape = (param: ValidationProperties<TData>, value: string) => {
    param.shape?.forEach((s) => {
      if (param.where) {
        if (s.type === "required" && param.where(data)) {
          Utils.IsNullOrEmpty(value) ? setError(param.key, s.message, param.step) : null;
        }
      } else {
        // Subkeys Validations
        if (param.subkey) {
          const levels = param.subkey.split(".");
          const key = levels[levels.length - 1] as keyof TData;

          if (s.type === "required") {
            Utils.IsNullOrEmpty(value) ? setError(key, s.message, param.step) : null;
          }

          if (s.type === "minimum") {
            value && value.length < (s.value as number)
              ? setError(key, Utils.StringFormat(s.message, s.value), param.step)
              : null;
          }

          if (s.type === "maximum") {
            value && value.length > (s.value as number)
              ? setError(key, Utils.StringFormat(s.message, s.value), param.step)
              : null;
          }

          if (s.type === "email") {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

            !regex && Utils.IsNullOrEmpty(value) ? setError(key, s.message, param.step) : null;
          }

          return;
        }

        // Keys Validations
        if (s.type === "required") {
          Utils.IsNullOrEmpty(value) ? setError(param.key, s.message, param.step) : null;
        }

        if (s.type === "minimum") {
          value && value.length < (s.value as number)
            ? setError(param.key, Utils.StringFormat(s.message, s.value), param.step)
            : null;
        }

        if (s.type === "maximum") {
          value && value.length > (s.value as number)
            ? setError(param.key, Utils.StringFormat(s.message, s.value), param.step)
            : null;
        }

        if (s.type === "email") {
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

          !regex && Utils.IsNullOrEmpty(value) ? setError(param.key, s.message, param.step) : null;
        }
      }
    });
  };

  // useEffects
  useEffect(() => {
    setErrors({});
    _errors.current = {};

    if (!submit) return;

    params.forEach((param) => handleParams(param));
  }, [submit, data]);

  return {
    onSubmit,
    setSubmit,
    errors: step
      ? (Object.fromEntries(
          Object.entries(errors)
            .filter(([key]) => key.startsWith(`${step}_`))
            .map(([key, value]) => [key.replace(/^\d+_/, ""), String(value)])
        ) as Errors<TData>)
      : errors,
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

export const useLoading = () => {
  const context = useContext(LoadingContext);

  // if (!context) {
  //   throw new Error("useLayout must be used within a LayoutProvider");
  // }

  return context;
};
