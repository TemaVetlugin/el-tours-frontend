import React from "react";
import { IconType } from "./index";

export const chevronRight: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
