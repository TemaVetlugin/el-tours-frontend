import React from "react";
import { IconType } from "./index";

export const check: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
