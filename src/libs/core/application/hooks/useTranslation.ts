import Utils from "../../../infrastructure/shared/Utils";
import { INotificationLocale, NotificationEN, NotificationTR } from "../locales";
import TableEN from "../locales/table/en";
import ITableLocale from "../locales/table/ITableLocale";
import TableTR from "../locales/table/tr";

type LocaleMap = Record<string, Record<string, any>>;

const useTranslation = function <TBaseLocale>(currentLanguage: string | undefined, translations: LocaleMap = {}) {
  const merged: LocaleMap = {};
  const ExtraLocales: LocaleMap = {
    tr: { ...TableTR, ...NotificationTR },
    en: { ...TableEN, ...NotificationEN },
  };
  const allLanguages = new Set([...Object.keys(translations), ...Object.keys(ExtraLocales)]);

  allLanguages.forEach((lang) => {
    merged[lang] = {
      ...translations[lang],
      ...ExtraLocales[lang],
    };
  });

  const t = (
    key: Extract<keyof TBaseLocale | keyof ITableLocale | keyof INotificationLocale, string>,
    ...args: any[]
  ) => {
    return Utils.StringFormat(merged[currentLanguage ?? "tr"][key], ...args) ?? "";
  };

  return { t, currentLanguage };
};

export default useTranslation;
