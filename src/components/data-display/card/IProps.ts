import React from "react";
import { IChildren, IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps extends IGlobalProps, IChildren {
  title?: string;
  actions?: React.JSX.Element;
}

export default IProps;
