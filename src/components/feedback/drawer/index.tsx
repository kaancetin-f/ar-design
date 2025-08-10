"use client";

import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import Typography from "../../data-display/typography";
import "../../../assets/css/components/feedback/drawer/styles.css";

const { Title } = Typography;

const Drawer: React.FC<IProps> = ({ title, tabs = [], activeTab, open, onChange }) => {
  // refs
  const _arDrawer = useRef<HTMLDivElement>(null);
  const _drawerWrapperClassName: string[] = ["ar-drawer-wrapper"];
  const _drawerClassName: string[] = ["ar-drawer"];

  if (Object.keys(open).length > 0 && open.get) _drawerWrapperClassName.push("opened");
  else _drawerWrapperClassName.push("closed");

  // states
  const [currentTab, setCurrentTab] = useState<number>(0);

  // useEffects

  // methods
  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;
    const isArModal = document.getElementsByClassName("ar-modal-wrapper opened").length === 0;
    const isArSelectOptions = document.getElementsByClassName("ar-select-options").length === 0;
    const isArCalendar = document.getElementsByClassName("ar-date-calendar").length === 0;
    const isArPopover = document.getElementsByClassName("ar-popover").length === 0;

    if (key === "Escape" && isArModal && isArCalendar && isArSelectOptions && isArPopover) {
      event.stopPropagation();
      open.set(false);
    }
  };

  // useEffects
  useEffect(() => {
    if (open.get) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      document.body.style.removeProperty("overflow");
      document.removeEventListener("keydown", handleKeys);
    };
  }, [open.get]);

  useEffect(() => setCurrentTab(activeTab ?? 0), [activeTab]);

  return (
    <div className={_drawerWrapperClassName.map((c) => c).join(" ")}>
      <div
        className="ar-drawer-bg"
        onMouseDown={(event) => {
          event.stopPropagation();

          const target = event.target as HTMLElement;
          if (_arDrawer.current && !_arDrawer.current.contains(target)) open.set(false);
        }}
      ></div>

      <div ref={_arDrawer} className={_drawerClassName.map((c) => c).join(" ")} role="dialog">
        {title && (
          <div className="header">
            <Title Level="h3">{title}</Title>

            <div className="close" onClick={() => open.set((prev) => !prev)}></div>
          </div>
        )}

        <div className="tabs">
          {tabs.length > 0 &&
            tabs.map((tab, index) => {
              let className: string[] = ["item"];

              if (currentTab === index) className.push("selection");

              return (
                <div
                  key={tab.title ?? index}
                  className={className.map((c) => c).join(" ")}
                  onClick={() => {
                    setCurrentTab(index);
                    onChange && onChange(index);

                    const key = `${window.location.pathname}::${name}`;
                    sessionStorage.setItem(key, String(index));
                  }}
                >
                  <span>{tab.title}</span>
                </div>
              );
            })}
        </div>

        <div className="content">{tabs.map((tab, index) => currentTab === index && tab.content)}</div>
      </div>
    </div>
  );
};

export default Drawer;
