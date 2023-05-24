import React from "react";
import { IconType } from "./index";

export const stocks: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8L8 16" stroke={colors[0]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="9" r="1.25" stroke={colors[0]} strokeWidth="1.5"/>
        <circle cx="15" cy="15" r="1.25" stroke={colors[0]} strokeWidth="1.5"/>
    </svg>
);
