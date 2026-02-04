import Utils from "../../../infrastructure/shared/Utils";
import { INotificationLocale, NotificationEN, NotificationTR } from "../locales";

type LocaleMap = Record<string, Record<string, any>>;

const useTranslation = function <TBaseLocale>(currentLanguage: string | undefined, translations: LocaleMap = {}) {
  const merged: LocaleMap = {};
  const NotificationLocales: LocaleMap = {
    tr: NotificationTR,
    en: NotificationEN,
  };
  const allLanguages = new Set([...Object.keys(translations), ...Object.keys(NotificationLocales)]);

  allLanguages.forEach((lang) => {
    merged[lang] = {
      ...translations[lang],
      ...NotificationLocales[lang],
    };
  });

  const t = (key: Extract<keyof TBaseLocale | keyof INotificationLocale, string>, ...args: any[]) => {
    return Utils.StringFormat(merged[currentLanguage ?? "tr"][key], ...args) ?? "";
  };

  return { t, currentLanguage };
};

export default useTranslation;
