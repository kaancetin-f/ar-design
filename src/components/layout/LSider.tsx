"use client";

import React from "react";
import { useLayout } from "../../libs/core/application/hooks";

const LSider: React.FC = () => {
  // hooks
  const { config } = useLayout();
  const sider = config.layout.sider.left;

  if (!sider?.active) return null;

  return <aside className="ar-aside left">{sider.element}</aside>;
};

LSider.displayName = "Layout.LSider";
export default LSider;
