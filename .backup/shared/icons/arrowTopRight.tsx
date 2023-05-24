import React from "react";
import { IconType } from "./index";

export const arrowTopRight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.66406 12.3333L12.3307 1.66663"
            stroke={colors[0]}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M3.66406 1.66663H12.3307V10.3333"
            stroke={colors[0]}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
