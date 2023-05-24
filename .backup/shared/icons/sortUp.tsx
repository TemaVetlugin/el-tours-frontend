import React from "react";
import { IconType } from "./index";
import color = Mocha.reporters.Base.color;

export const sortUp: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line
            x1="0.9" y1="-0.9" x2="14.1" y2="-0.9"
            transform="matrix(1 0 0 -1 4.5 16.5)"
            stroke={colors[0]}
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <line
            x1="0.9" y1="-0.9" x2="8.1" y2="-0.9"
            transform="matrix(1 0 0 -1 7.5 12)"
            stroke={colors[0]}
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <line
            x1="0.9" y1="-0.9" x2="2.1" y2="-0.9"
            transform="matrix(1 0 0 -1 10.5 7.5)"
            stroke={colors[0]}
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);
