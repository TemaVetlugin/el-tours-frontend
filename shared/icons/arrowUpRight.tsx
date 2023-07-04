import React from "react";

import { IconType } from "./index";

export const arrowUpRight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33203 22.6673L22.6654 9.33398" stroke={colors[0]} strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path d="M9.33203 9.33398H22.6654V22.6673" stroke={colors[0]} strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"/>
    </svg>
);
