import React from "react";
import { IconType } from "./index";

export const location: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 2.5C18.9543 2.5 9.99998 11.2945 10 22.1429C10 35.8929 22 41.7858 30 57.5C38 41.7858 50 35.8929 50 22.1429C50 11.2945 41.0457 2.5 30 2.5Z" fill="white" stroke={colors[0]} strokeWidth="2"/>
        <circle cx="30" cy="20" r="9" stroke={colors[0]} strokeWidth="2"/>
    </svg>
);
