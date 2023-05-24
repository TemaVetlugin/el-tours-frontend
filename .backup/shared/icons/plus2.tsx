import React from "react";
import { IconType } from "./index";

export const plus2: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1 6.3125H11"
            stroke={colors[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6 1V11"
            stroke={colors[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);