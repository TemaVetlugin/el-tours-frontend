import React from "react";
import { IconType } from "./index";

export const filter: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
