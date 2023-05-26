import React from "react";
import { IconType } from "./index";

export const arrowUpRight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7 17L17 7"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7 7H17V17"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
