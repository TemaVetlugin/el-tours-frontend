import React from "react";

import { IconType } from "./index";

export const trash: IconType = (size, colors) => (
    <svg
        width={size[0]}
        height={size[0]}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 6H5H21"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 6.00098V4.00098C8 3.47054 8.21071 2.96184 8.58579 2.58676C8.96086 2.21169 9.46957 2.00098 10 2.00098H14C14.5304 2.00098 15.0391 2.21169 15.4142 2.58676C15.7893 2.96184 16 3.47054 16 4.00098V6.00098M19 6.00098V20.001C19 20.5314 18.7893 21.0401 18.4142 21.4152C18.0391 21.7903 17.5304 22.001 17 22.001H7C6.46957 22.001 5.96086 21.7903 5.58579 21.4152C5.21071 21.0401 5 20.5314 5 20.001V6.00098H19Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 11.001V17.001"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14 11.001V17.001"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
