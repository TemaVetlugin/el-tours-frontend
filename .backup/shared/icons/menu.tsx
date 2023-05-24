import React from "react";
import { IconType } from "./index";

export const menu: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1] * 15 /20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3H3V10H10V3Z" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 3H14V10H21V3Z" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 14H14V21H21V14Z" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14H3V21H10V14Z" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
