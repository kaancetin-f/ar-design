import React from "react";
import { SectionProps } from "./Types";

const Section: React.FC<SectionProps> = ({ children }) => children;

Section.displayName = "Layout.Section";
export default Section;
