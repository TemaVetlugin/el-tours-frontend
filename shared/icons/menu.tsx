import React from "react";
import { IconType } from "./index";

export const menu: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1] * 15 /20} viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="20" height="2" rx="1" fill={colors[0]}/>
        <rect y="6.5" width="14" height="2" rx="1" fill={colors[0]}/>
        <rect y="12.5" width="20" height="2" rx="1" fill={colors[0]}/>
    </svg>
);
