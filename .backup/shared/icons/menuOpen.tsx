import React from "react";
import { IconType } from "./index";

export const menuOpen: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1] * 15 /20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 3H3V10H10V3Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.5005 1.55025L12.5508 6.5L17.5005 11.4497L22.4503 6.5L17.5005 1.55025Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M21 14H14V21H21V14Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 14H3V21H10V14Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
