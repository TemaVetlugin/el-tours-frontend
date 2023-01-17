import React from "react";
import { IconType } from "./index";

export const search: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20.9984 21.0004L16.6484 16.6504"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
