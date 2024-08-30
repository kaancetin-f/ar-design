"use client";

import React, { createContext, useState } from "react";

type LayoutOptions = { aside: { active: boolean } };
type LayoutContextProps = {
  options: LayoutOptions;
  setOptions: React.Dispatch<React.SetStateAction<LayoutOptions>>;
};
type LayoutProviderProps = { children: React.ReactNode };

const LayoutContext = createContext<Partial<LayoutContextProps>>({});

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [options, setOptions] = useState<LayoutOptions>({ aside: { active: false } });

  return (
    <LayoutContext.Provider value={{ options, setOptions }}>{children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
