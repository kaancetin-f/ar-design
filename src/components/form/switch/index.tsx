"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/form/switch/styles.css";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Switch: React.FC<IProps> = ({ label, status = "primary", border = { radius: "pill" }, ...attributes }) => {
  // refs
  let _switch = useRef<HTMLInputElement>(null);
  const _switchClassName: string[] = ["ar-switch"];

  // states
  const [checked, setChecked] = useState<boolean>(attributes.checked ?? false);

  _switchClassName.push(
    ...Utils.GetClassName(
      "filled",
      attributes.checked ? status : "light",
      border,
      undefined,
      undefined,
      attributes.className
    )
  );

  // useEffects
  useEffect(() => {
    setChecked(attributes.checked ?? false);
  }, [attributes.checked]);

  return (
    <div className="ar-switch-wrapper">
      <label>
        <input
          type={"checkbox"}
          {...attributes}
          checked={checked}
          size={0}
          onChange={(event) => {
            event.stopPropagation();

            (() => {
              setChecked(event.target.checked);
            })();

            (() => attributes.onChange && attributes.onChange(event))();
          }}
        />

        <span ref={_switch} className={_switchClassName.map((c) => c).join(" ")}>
          <span className="handle border-radius-pill"></span>
        </span>

        {label && <span className="label">{label}</span>}
      </label>
    </div>
  );
};

Switch.displayName = "Switch";
export default Switch;
