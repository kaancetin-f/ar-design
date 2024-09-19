import React from "react";
import { ISectionProps } from "./IProps";

const Section: React.FC<ISectionProps> = ({ children }) => <section>{children}</section>;

Section.displayName = "Layout.Section";
export default Section;
