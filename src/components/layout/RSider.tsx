"use client";

import React from "react";
import { useLayout } from "../../libs/core/application/hooks";

const RSider: React.FC = () => {
  // hooks
  const { options } = useLayout();
  const sider = options?.sider?.right;

  if (!sider?.active) return null;

  return <aside className="ar-aside right">{sider.element}</aside>;
};

RSider.displayName = "Layout.RSider";
export default RSider;
