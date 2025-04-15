import { useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../contexts/Config";
import { NotificationContext, Status } from "../contexts/Notification";
import Utils from "../../../infrastructure/shared/Utils";
import { Errors, ValidationProperties, ValidationShape } from "../../../types";
import { LanguageContext } from "../contexts/Language";
import { LoadingContext } from "../contexts/Loading";
import { INotificationLocale, NotificationTR, NotificationEN } from "../locales";

export const useLayout = () => {
  const context = useContext(ConfigContext);

  if (!context) throw new Error("useLayout must be used within a LayoutProvider");

  return context;
};

export const useLoading = () => useContext(LoadingContext);

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = function <TBaseLocale>(
  currentLanguage: string | undefined,
  translations?: { [key: string]: any }
) {
  const merged: { [key: string]: any } = {
    tr: { ...translations?.tr, ...NotificationTR },
    en: { ...translations?.en, ...NotificationEN },
  };

  const t = (key: keyof TBaseLocale | keyof INotificationLocale, ...args: any[]) => {
    return Utils.StringFormat(merged[currentLanguage ?? "tr"][key], args) ?? "";
  };

  return { t, currentLanguage };
};

export const useNotification = () => {
  // contexts
  const { setTitle, setMessage, setStatus, setTrigger } = useContext(NotificationContext);

  // methods
  const notification = ({ title, message, status }: { title: string; message?: string; status: Status | number }) => {
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
    const value = data[param.key as keyof typeof data] as string | undefined;

    // Eğer subkey varsa, onunla işlem yapılacak.
    if (param.subkey) {
      if (param.subkey.includes(".")) {
        // Subkey içinde birden fazla seviye varsa, her seviyeye inerek değer alınacak.
        const levels = param.subkey.split(".");
        let currentData: any = value;

        for (const key of levels) {
          // Eğer currentData null ya da undefined ise, işlem sonlandırılır.
          if (!currentData) {
            paramsShape(param, currentData);
            return;
          }
          // Seviye bazında ilerleyerek veriye ulaşılır.
          currentData = currentData[key as keyof typeof currentData];
        }

        // Son seviyedeki veriyi paramsShape fonksiyonuna gönder.
        paramsShape(param, currentData);
      } else {
        // Subkey sadece bir seviye ise, doğrudan kullanılır.
        paramsShape(param, value?.[param.subkey as keyof typeof value] as string);
      }
    } else {
      // Eğer subkey yoksa, doğrudan param.key üzerinden işlem yapılır.
      paramsShape(param, value);
    }
  };

  const paramsShape = (param: ValidationProperties<TData>, value: string | undefined) => {
    const vLenght = value ? value.length : 0;

    const getKey = (subkey: string | undefined) => {
      if (!subkey) return param.key;

      const levels = subkey.split(".");
      return levels[levels.length - 1] as keyof TData;
    };

    const handleValidation = (key: keyof TData, s: ValidationShape) => {
      if (s.type === "required" && Utils.IsNullOrEmpty(value)) {
        setError(key, s.message, param.step);
      }

      if (s.type === "minimum" && vLenght < (s.value as number)) {
        setError(key, Utils.StringFormat(s.message, s.value), param.step);
      }

      if (s.type === "maximum" && vLenght > (s.value as number)) {
        setError(key, Utils.StringFormat(s.message, s.value), param.step);
      }

      if (s.type === "email" && value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        setError(key, s.message, param.step);
      }
    };

    param.shape?.forEach((s) => {
      const key = getKey(param.subkey);

      if (param.where) {
        if (s.type === "required" && !param.where(data)) {
          Utils.IsNullOrEmpty(value) && setError(param.subkey ? key : param.key, s.message, param.step);
        }
      } else {
        handleValidation(key, s);
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
