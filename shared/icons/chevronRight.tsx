import React from "react";
import { IconType } from "./index";

export const chevronRight: IconType = (size, colors) => (
    <svg width={size[0] * 6 / 8} height={size[1]} viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L4.5 4L1.5 7" stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
