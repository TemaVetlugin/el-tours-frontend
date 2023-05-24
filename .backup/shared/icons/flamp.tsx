import React from "react";
import { IconType } from "./index";

export const flamp: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2511_175461)">
            <path
                d="M24.5 0H0.5V24H24.5V0Z"
                fill={colors[0]}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0385 8.92249H13.0334V10.8263H16.8752V13.2255H13.0334V16.6153H10.416V8.8451H9.46704C9.02316 8.8451 8.54867 9.10824 8.54867 9.68094C8.54867 10.0989 8.82418 10.3929 9.16092 10.5477L8.50275 12.854C7.09459 12.4671 6.03847 11.3371 6.03847 9.66546C6.03847 7.60683 7.69153 6.46143 9.51296 6.46143H18.0232V8.92249H18.0385Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="clip0_2511_175461">
                <rect x="0.5" width="24" height="24" rx="4" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);
