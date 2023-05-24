import React from "react";
import { IconType } from "./index";

export const question: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1534_124270)">
            <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke={colors[0]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 18C12.6213 18 13.125 17.4963 13.125 16.875C13.125 16.2537 12.6213 15.75 12 15.75C11.3787 15.75 10.875 16.2537 10.875 16.875C10.875 17.4963 11.3787 18 12 18Z"
                fill={colors[0]}
            />
            <path
                d="M12 13.5V12.75C12.5192 12.75 13.0267 12.596 13.4584 12.3076C13.8901 12.0192 14.2265 11.6092 14.4252 11.1295C14.6239 10.6499 14.6758 10.1221 14.5746 9.61289C14.4733 9.10369 14.2233 8.63596 13.8562 8.26885C13.489 7.90173 13.0213 7.65173 12.5121 7.55044C12.0029 7.44915 11.4751 7.50114 10.9955 7.69982C10.5158 7.8985 10.1058 8.23495 9.81739 8.66663C9.52895 9.09831 9.375 9.60583 9.375 10.125"
                stroke={colors[0]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_1534_124270">
                <rect
                    width={size[0]}
                    height={size[1]}
                    fill="white"
                />
            </clipPath>
        </defs>
    </svg>
);
