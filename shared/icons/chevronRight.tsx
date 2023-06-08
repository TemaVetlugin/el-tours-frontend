import React from "react";

import { IconType } from "./index";

export const chevronRight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.70456 18.5L15.7891 12.5L9.70456 6.5"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
