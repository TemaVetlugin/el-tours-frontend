import React from "react";
import { IconType } from "./index";

export const chevronUp: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} transform="scale(1 -1)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
