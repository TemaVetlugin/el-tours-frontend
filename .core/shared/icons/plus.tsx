import React from "react";
import { IconType } from "./index";

export const plus: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
