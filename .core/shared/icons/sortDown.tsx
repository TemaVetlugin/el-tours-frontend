import React from "react";
import { IconType } from "./index";

export const sortDown: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5.4" y1="6.6" x2="18.6" y2="6.6" stroke={colors[0]} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8.4" y1="11.1" x2="15.6" y2="11.1" stroke={colors[0]} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="11.4" y1="15.6" x2="12.6" y2="15.6" stroke={colors[0]} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
);
