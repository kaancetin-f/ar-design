"use client";

import React, { useState } from "react";
import { useLayout } from "../../libs/core/application/hooks";
import { ILSiderProps } from "./IProps";
import Title from "../data-display/typography/title/Title";
import Paragraph from "../data-display/typography/paragraph/Paragraph";
import { ARIcon } from "../icons";
import { DispatchEvent, SessionStorage } from "../../libs/infrastructure/shared/Enums";

const LSider: React.FC<ILSiderProps> = ({ image, text, footer, ...attributes }) => {
  // states
  const [isLocked, setIsLocked] = useState<boolean>(true);

  // variables
  const _className: string[] = ["ar-aside", "left", isLocked ? "locked" : "un-locked"];

  if (attributes.className) _className.push(attributes.className);

  // hooks
  const { config } = useLayout();
  const sider = config.layout.sider.left;

  if (!sider?.active) return null;

  return (
    <aside
      {...attributes}
      className={_className.map((c) => c).join(" ")}
      onMouseOver={() => {
        sessionStorage.setItem(SessionStorage.MenuIsLocked, String(true));
        window.dispatchEvent(new Event(DispatchEvent.MenuLock));
      }}
      onMouseLeave={() => {
        sessionStorage.setItem(SessionStorage.MenuIsLocked, String(isLocked));
        window.dispatchEvent(new Event(DispatchEvent.MenuLock));
      }}
    >
      <span className="button" role="button" onClick={() => setIsLocked((prev) => !prev)}>
        <ARIcon size={20} strokeWidth={0} fill="currentColor" icon={isLocked ? "ChevronBarLeft" : "ChevronBarRight"} />
      </span>

      <div className="logo">
        {image}

        <Title Level="h4" align="center">
          {text}
        </Title>
      </div>

      <div>{sider.element}</div>

      {footer && (
        <footer>
          <Paragraph size="small">{footer}</Paragraph>
        </footer>
      )}
    </aside>
  );
};

LSider.displayName = "Layout.LSider";
export default LSider;
