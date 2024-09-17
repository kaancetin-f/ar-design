"use client";

import React from "react";
import { SiderProps } from "./Types";
import useLayout from "../../libs/core/application/hooks/useLayout";

const RSider: React.FC<SiderProps> = () => {
  // hooks
  const { options } = useLayout();
  const sider = options?.sider?.right;

  if (!sider?.active) return null;

  return <aside className="ar-aside right">{sider.element}</aside>;
};

RSider.displayName = "Layout.RSider";
export default RSider;
