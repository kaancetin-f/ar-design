"use client";

import React, { useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/tabs/tabs.css";

const Tabs: React.FC<IProps> = ({ tabs = [] }) => {
  // states
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="ar-tabs">
      <div className="tabs">
        {tabs.length > 0 &&
          tabs.map((tab, index) => {
            let className: string[] = ["item"];

            if (currentTab === index) className.push("selection");

            return (
              <div
                key={tab.title || index}
                className={className.map((c) => c).join(" ")}
                onClick={() => setCurrentTab(index)}
              >
                <span>{tab.title}</span>
              </div>
            );
          })}
      </div>

      <div className="content">{tabs.map((tab, index) => currentTab === index && tab.content)}</div>
    </div>
  );
};

export default Tabs;
