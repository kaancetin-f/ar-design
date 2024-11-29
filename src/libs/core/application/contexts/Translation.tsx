"use client";

import React, { createContext, useState } from "react";
import Utils from "../../../infrastructure/shared/Utils";

type ContextProps = {
  t: (key: string, ...args: any[]) => string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

type ProviderProps = {
  children: React.ReactNode;
  translations: { [key: string]: any };
  initialLanguage: string;
};

const TranslationContext = createContext<ContextProps>({
  t: (key: string) => key,
  setLanguage: () => {},
});

const TranslationProvider = ({ children, translations, initialLanguage }: ProviderProps) => {
  const [language, setLanguage] = useState<string>(initialLanguage);

  const t = (key: string, ...args: any[]) => {
    return Utils.StringFormat(translations[language][key], args);
  };

  return <TranslationContext.Provider value={{ t, setLanguage }}>{children}</TranslationContext.Provider>;
};

export { TranslationContext, TranslationProvider };
