import React from "react";

import { IconType } from "./index";

export const novelty: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.6654 14L7.9987 10.6667L3.33203 14V3.33333C3.33203 2.97971 3.47251 2.64057 3.72256 2.39052C3.9726 2.14048 4.31174 2 4.66536 2H11.332C11.6857 2 12.0248 2.14048 12.2748 2.39052C12.5249 2.64057 12.6654 2.97971 12.6654 3.33333V14Z"
            stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);
