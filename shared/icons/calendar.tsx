import React from "react";

import { IconType } from "./index";

export const calendar: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z"
            stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.668 1.33398V4.00065" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.33203 1.33398V4.00065" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 6.6665H14" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>

    </svg>
);
