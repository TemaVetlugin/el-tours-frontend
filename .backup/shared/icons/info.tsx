import React from "react";
import { IconType } from "./index";

export const info: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1534_128905)">
            <path
                d="M15 26C21.0751 26 26 21.0751 26 15C26 8.92487 21.0751 4 15 4C8.92487 4 4 8.92487 4 15C4 21.0751 8.92487 26 15 26Z"
                stroke={colors[0]}
                strokeWidth="1.875"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.0625 14.0625H15.0625V20.0625H16.0625"
                stroke={colors[0]}
                strokeWidth="1.875"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"
                fill={colors[0]}
            />
        </g>
        <defs>
            <clipPath id="clip0_1534_128905">
                <rect width="30" height="30" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);
