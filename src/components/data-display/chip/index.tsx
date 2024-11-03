"use client";

import React from "react";
import "../../../assets/css/components/data-display/chip/chip.css";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Chip: React.FC<IProps> = ({
  variant = "outlined",
  status = "primary",
  border = { radius: "sm" },
  text,
}) => {
  let _chipClassName: string[] = ["ar-chip"];

  _chipClassName.push(
    ...Utils.GetClassName(variant, status, border, undefined, undefined, undefined)
  );

  return <span className={_chipClassName.map((c) => c).join(" ")}>{text}</span>;
};

export default Chip;
