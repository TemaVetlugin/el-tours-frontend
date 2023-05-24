import React from "react";
import { IconType } from "./index";

export const closeCircle: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25Z"
            stroke={colors[0]}
            strokeWidth="1.875"
            strokeMiterlimit="10"
        />
        <path
            d="M18.75 11.25L11.25 18.75"
            stroke={colors[0]}
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18.75 18.75L11.25 11.25"
            stroke={colors[0]}
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
