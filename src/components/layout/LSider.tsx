"use client";

import React from "react";
import { SiderProps } from "./Types";
import useLayout from "../../libs/core/application/hooks/useLayout";

const LSider: React.FC<SiderProps> = () => {
  // hooks
  const { options } = useLayout();

  return (
    options?.sider?.left?.active && (
      <aside className="ar-aside left">{options?.sider?.left?.element}</aside>
    )
  );
};

LSider.displayName = "Layout.LSider";
export default LSider;
