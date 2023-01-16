import React from "react";
import { IconType } from "./index";

export const chevronLeft: IconType = (size, colors) => (
    <svg width={size[0] * 6 / 8} height={size[1]} viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 1L1.5 4L4.5 7" stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
