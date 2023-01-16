import React from "react";
import { IconType } from "./index";

export const warning: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
            stroke={colors[0]}
            strokeWidth="1.75"
            strokeMiterlimit="10"
        />
        <path
            d="M14 8.75V14.875"
            stroke={colors[0]}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14 20.125C14.7249 20.125 15.3125 19.5374 15.3125 18.8125C15.3125 18.0876 14.7249 17.5 14 17.5C13.2751 17.5 12.6875 18.0876 12.6875 18.8125C12.6875 19.5374 13.2751 20.125 14 20.125Z"
            fill={colors[0]}
        />
    </svg>
);
