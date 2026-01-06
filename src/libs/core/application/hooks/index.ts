"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../contexts/Config";
import { NotificationContext, PopupButtonConfig, Status } from "../contexts/Notification";
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
    return Utils.StringFormat(merged[currentLanguage ?? "tr"][key], ...args) ?? "";
  };

  return { t, currentLanguage };
};

export const useNotification = () => {
  // contexts
  const { setTitle, setMessage, setStatus, setPopupStatus, setTrigger, setIsPopupOpen, setPopupButtons, setOnConfirm } =
    useContext(NotificationContext);

  // methods
  const notification = ({ title, message, status }: { title: string; message?: string; status: Status | number }) => {
    setTitle?.(title);
    setMessage?.(message ?? "");
    setStatus?.(status);
    setTrigger?.((trigger) => !trigger);
  };

  const popupConfirm = ({
    title,
    message,
    status,
    buttons,
    onConfirm,
  }: {
    title: string;
    message?: string;
    status: (Status | "save" | "delete") | number;
    buttons?: PopupButtonConfig | null;
    onConfirm?: (confirm: boolean) => void;
  }) => {
    setTitle?.(title);
    setMessage?.(message ?? "");
    setPopupStatus?.(status);
    setIsPopupOpen?.((trigger) => !trigger);
    setPopupButtons?.(buttons ?? null);
    setOnConfirm?.(() => onConfirm);
  };

  return { notification, popupConfirm };
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

    queueMicrotask(() => {
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
    });
  };

  const setError = (key: keyof TData, message: string, step?: number, index?: number) => {
    let _key = step ? `${step}_${key as string}` : key;

    if (index !== undefined) _key = `${_key as string}_${index}`;

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
        if (Array.isArray(value)) {
          // Eğer value bir dizi ise ve subkey sadece bir seviye ise,
          // dizinin her bir elemanına subkey uygulanabilir.
          const extractedValues = value.map((item) => item?.[param.subkey as keyof typeof item]);

          // Elde edilen değerler topluca paramsShape'e gönderilebilir ya da başka bir şekilde işlenebilir.
          extractedValues.map((extractedValue, index) => paramsShape(param, extractedValue, index));
        } else {
          // Value bir obje ise, subkey doğrudan kullanılır.
          paramsShape(param, value?.[param.subkey as keyof typeof value] as string);
        }
      }
    } else {
      // Eğer subkey yoksa, doğrudan param.key üzerinden işlem yapılır.
      paramsShape(param, value);
    }
  };

  const paramsShape = (param: ValidationProperties<TData>, value: string | undefined, index?: number) => {
    const vLenght = value ? value.length : 0;

    const getKey = (subkey: string | undefined) => {
      if (!subkey) return param.key;

      const levels = subkey.split(".");
      return levels[levels.length - 1] as keyof TData;
    };

    const handleValidation = (key: keyof TData, s: ValidationShape) => {
      if (s.type === "required" && Utils.IsNullOrEmpty(value)) {
        setError(key, s.message, param.step, index);
      }

      if (s.type === "minimum" && vLenght < (s.value as number)) {
        setError(key, Utils.StringFormat(s.message, s.value), param.step, index);
      }

      if (s.type === "maximum" && vLenght > (s.value as number)) {
        setError(key, Utils.StringFormat(s.message, s.value), param.step, index);
      }

      // Regexes
      // const phoneRegex = /^((\+90|0)?([2-5]\d{2})\d{7}|\+[1-9]\d{7,14})$/;
      const phoneRegex = /^\d{7,14}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const ibanRegex = /^TR\d{24}$/;
      const accountNumberRegex = /^\d{6,16}$/;

      if (s.type === "phone" && value && !phoneRegex.test(value.replace(/\D/g, ""))) {
        setError(key, s.message, param.step, index);
      }

      if (s.type === "email" && value && !emailRegex.test(value)) {
        setError(key, s.message, param.step, index);
      }

      if (s.type === "iban" && value && !ibanRegex.test(value.replace(/\s/g, ""))) {
        setError(key, s.message, param.step, index);
      }

      if (s.type === "account-number" && value && !accountNumberRegex.test(value)) {
        setError(key, s.message, param.step, index);
      }
    };

    param.shape?.forEach((s) => {
      const key = getKey(param.subkey);

      if (param.where) {
        if (s.type === "required" && param.where(data)) {
          setError(param.subkey ? key : param.key, s.message, param.step);
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
