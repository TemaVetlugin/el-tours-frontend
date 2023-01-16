import React from "react";
import { IconType } from "./index";

export const close: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4861 4.375L4.375 15.4861" stroke={colors[0]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.4861 15.4861L4.375 4.375" stroke={colors[0]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
