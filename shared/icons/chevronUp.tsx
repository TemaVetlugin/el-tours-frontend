import React from "react";
import { IconType } from "./index";

export const chevronUp: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1] * 5 / 8} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1 0.999999L4 4L7 1"
            stroke={colors[0]}
            strokeWidth="1.5"
            transform='rotate(180 4 2.5)'
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
