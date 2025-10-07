import React from "react";
import IProps from "./IProps";

const Skeleton = ({ tabs = [] }: IProps) => {
  return (
    <div className="ar-tabs skeleton">
      <div className="tabs">
        {tabs.length > 0 &&
          tabs.map((tab, index) => {
            return (
              <div key={tab.title ?? index} className="item" style={{ width: `${tab.title.length}px` }}>
                {Array.from({ length: 3 }, (_, i) => (
                  <span style={{ animationDelay: `${i++}s` }}></span>
                ))}
              </div>
            );
          })}
      </div>

      <div className="content"></div>
    </div>
  );
};

export default Skeleton;
