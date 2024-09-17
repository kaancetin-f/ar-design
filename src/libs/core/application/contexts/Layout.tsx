"use client";

import React, { createContext, useState } from "react";

type LayoutOptions = {
  sider: {
    left?: { element?: React.ReactNode; active: boolean };
    right?: { element?: React.ReactNode; active: boolean };
  };
};
type LayoutContextProps = {
  options: Partial<LayoutOptions>;
  setOptions: React.Dispatch<React.SetStateAction<Partial<LayoutOptions>>>;
};
type LayoutProviderProps = { children: React.ReactNode };

const LayoutContext = createContext<Partial<LayoutContextProps>>({});

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [options, setOptions] = useState<Partial<LayoutOptions>>({});

  return (
    <LayoutContext.Provider value={{ options, setOptions }}>{children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
