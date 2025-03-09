"use client";

import React, { useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/tabs/tabs.css";

const Tabs: React.FC<IProps> = ({ tabs = [], activeTab, onChange, onClose }) => {
  // states
  const [currentTab, setCurrentTab] = useState<number>(0);

  // useEffects
  useEffect(() => {
    setCurrentTab(activeTab ?? 0);
  }, [activeTab]);

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
                  onChange && onChange(index);
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
