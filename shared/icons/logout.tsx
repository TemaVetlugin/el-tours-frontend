import React from "react";

import { IconType } from "./index";

export const logout: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9 21L5 21C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19L3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3L9 3"
            stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17.002L21 12.002L16 7.00195" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12L9 12" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
