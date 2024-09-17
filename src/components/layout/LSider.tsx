"use client";

import React from "react";
import { SiderProps } from "./Types";
import useLayout from "../../libs/core/application/hooks/useLayout";

const LSider: React.FC<SiderProps> = () => {
  // hooks
  const { options } = useLayout();
  const sider = options?.sider?.left;

  if (!sider?.active) return null;

  return <aside className="ar-aside left">{sider.element}</aside>;
};

LSider.displayName = "Layout.LSider";
export default LSider;
