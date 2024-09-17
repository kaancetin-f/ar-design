"use client";

import React from "react";
import { SiderProps } from "./Types";
import useLayout from "../../libs/core/application/hooks/useLayout";

const RSider: React.FC<SiderProps> = () => {
  // hooks
  const { options } = useLayout();

  return (
    options?.sider?.right?.element && (
      <aside className="ar-aside right">{options?.sider?.right?.element}</aside>
    )
  );
};

RSider.displayName = "Layout.RSider";
export default RSider;
