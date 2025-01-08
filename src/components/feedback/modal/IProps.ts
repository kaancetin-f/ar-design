import React from "react";
import { IChildren, ISizes } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren, ISizes {
  /**
   *
   */
  open: {
    set: React.Dispatch<React.SetStateAction<boolean>>;
    get: boolean;
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
