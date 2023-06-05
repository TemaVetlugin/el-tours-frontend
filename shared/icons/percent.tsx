import React from "react";

import { IconType } from "./index";

export const percent: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12" stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="4" r="1.25" stroke={colors[0]} strokeWidth="1.5"/>
        <circle cx="11" cy="12" r="1.25" stroke={colors[0]} strokeWidth="1.5"/>
    </svg>
);
