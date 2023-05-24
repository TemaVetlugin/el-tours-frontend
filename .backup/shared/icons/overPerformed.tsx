import React from "react";
import { IconType } from "./index";

export const overPerformed: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10L12 4L21 10" stroke={colors[0]} strokeLinecap="round"/>
        <path d="M4 15L12 10L20 15" stroke={colors[0]} strokeLinecap="round"/>
        <path d="M5 20L12 16L19 20" stroke={colors[0]} strokeLinecap="round"/>
    </svg>
);
