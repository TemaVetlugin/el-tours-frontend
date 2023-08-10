import React from "react";
import { IconType } from "./index";

export const closeLight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.9492 7.05029L7.04972 16.9498"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7.05078 7.05029L16.9503 16.9498"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
