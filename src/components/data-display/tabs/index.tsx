"use client";

import React, { useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/tabs/tabs.css";
import Skeleton from "./skeleton";

const Tabs: React.FC<IProps> = ({ name, tabs = [], activeTab, onChange, onClose }) => {
  // states
  const [currentTab, setCurrentTab] = useState<number>(0);
  // states -> Loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffects
  useEffect(() => setCurrentTab(activeTab ?? 0), [activeTab]);

  useEffect(() => {
    const key = `${window.location.pathname}::${name}`;
    const stored = sessionStorage.getItem(key);

    setCurrentTab(stored !== null ? Number(stored) : 0);
    onChange?.(stored !== null ? Number(stored) : 0);

    setIsLoading(false);
  }, []);

  if (isLoading) return <Skeleton name={name} tabs={tabs} />;

  return (
    <div className="ar-tabs">
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
                  onChange?.(index);

                  const key = `${window.location.pathname}::${name}`;
                  sessionStorage.setItem(key, String(index));
                }}
              >
                <span>{tab.title}</span>
                {tab.config?.canBeClosed && (
                  <span
                    className="close-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onClose && onClose(index);
                    }}
                  >
                    ✖
                  </span>
                )}
              </div>
            );
          })}
      </div>

      <div className="content">{tabs.map((tab, index) => currentTab === index && tab.content)}</div>
    </div>
  );
};

export default Tabs;
