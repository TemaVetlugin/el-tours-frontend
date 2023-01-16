import React from "react";
import { IconType } from "./index";

export const arrowTop: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7 4.2L3.99998 1M3.99998 1L1 4.2M3.99998 1L3.99998 9"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
