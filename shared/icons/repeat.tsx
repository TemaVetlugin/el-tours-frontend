import React from "react";

import { IconType } from "./index";

export const repeat: IconType = (size, colors) => (
    <svg
        width={size[0]}
        height={size[1]}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1 4V10H7"
            stroke={colors[0]}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M3.51 15.0004C4.15839 16.8408 5.38734 18.4206 7.01166 19.5018C8.63598 20.583 10.5677 21.107 12.5157 20.9949C14.4637 20.8828 16.3226 20.1406 17.8121 18.8802C19.3017 17.6198 20.3413 15.9094 20.7742 14.0068C21.2072 12.1042 21.0101 10.1124 20.2126 8.33154C19.4152 6.55068 18.0605 5.07723 16.3528 4.1332C14.6451 3.18917 12.6769 2.8257 10.7447 3.09755C8.81245 3.36941 7.02091 4.26186 5.64 5.64044L1 10.0004"
            stroke={colors[0]}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
