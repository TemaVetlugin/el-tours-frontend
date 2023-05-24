import React from "react";
import { IconType } from "./index";
export const arrowRight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.875 10H3.125"
            stroke={colors[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.75 4.375L3.125 10L8.75 15.625"
            stroke={colors[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
