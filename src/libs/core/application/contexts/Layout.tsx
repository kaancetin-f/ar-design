"use client";

import React, { createContext, useState } from "react";

type LayoutOptions = {
  sider: {
    left?: { element?: React.ReactNode; active: boolean };
    right?: { element?: React.ReactNode; active: boolean };
  };
};

const defaultOptions: LayoutOptions = {
  sider: {
    left: { element: null, active: false },
    right: { element: null, active: false },
  },
};

type LayoutContextProps = {
  options: LayoutOptions;
  setOptions: React.Dispatch<React.SetStateAction<LayoutOptions>>;
};

type LayoutProviderProps = { children: React.ReactNode };

const LayoutContext = createContext<LayoutContextProps>({
  options: defaultOptions,
  setOptions: () => {},
});

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [options, setOptions] = useState<LayoutOptions>(defaultOptions);

  return (
    <LayoutContext.Provider value={{ options, setOptions }}>{children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
