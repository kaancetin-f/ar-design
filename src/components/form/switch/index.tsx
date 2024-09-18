import React, { useRef } from "react";
import { Props } from "./Types";
import "../../../assets/css/components/form/switch/switch.css";

const Switch: React.FC<Props> = ({ label, status = "primary", border, ...attributes }) => {
  // refs
  let _switch = useRef<HTMLInputElement>(null);

  // variables
  let _wrapperClassName = "ar-switch-wrapper";
  let _switchClassName = `ar-switch filled`;
  let _handleClassName = `handle`;

  // status
  _switchClassName += ` light`;

  // border
  _switchClassName += ` border-style-solid`;
  _switchClassName += ` border-radius-${border?.radius || "pill"}`;
  _handleClassName += ` border-radius-${border?.radius || "pill"}`;

  return (
    <div className={_wrapperClassName}>
      <label>
        <input
          type={attributes.type || "checkbox"}
          {...attributes}
          onChange={(event) => {
            (() => {
              const _current = _switch.current;
              if (!_current) return;

              event.target.checked
                ? _current.classList.replace("light", status)
                : _current.classList.replace(status, "light");
            })();

            (() => attributes.onChange && attributes.onChange(event))();
          }}
        />

        <span ref={_switch} className={_switchClassName}>
          <span className={_handleClassName}></span>
        </span>

        {label && <span className="label">{label}</span>}
      </label>
    </div>
  );
};

Switch.displayName = "Switch";
export default Switch;
