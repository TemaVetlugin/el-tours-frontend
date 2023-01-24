import React from "react";
import { IconType } from "./index";

export const mail: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="11" width="48" height="38" rx="2" stroke={colors[0]} strokeWidth="2"/>
        <path d="M6 12L29.3793 30.5086C29.743 30.7965 30.257 30.7965 30.6207 30.5086L54 12" stroke={colors[0]} strokeWidth="2"/>
    </svg>
);
