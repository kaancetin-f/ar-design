import React from "react";
import { IChildren, ISizes } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren, ISizes {
  /**
   *
   */
  open: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };

  /**
   * ...
   */
  title?: string;

  /**
   * ...
   */
  footer?: React.ReactNode;
}

export default IProps;
