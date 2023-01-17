import React from "react";
import { IconType } from "./index";

export const close: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.38571 20.6143C3.64286 20.8714 3.9 21 4.28571 21C4.67143 21 4.92857 20.8714 5.18571 20.6143L12 13.8L18.8143 20.6143C19.0714 20.8714 19.4571 21 19.7143 21C19.9714 21 20.3571 20.8714 20.6143 20.6143C21.1286 20.1 21.1286 19.3286 20.6143 18.8143L13.8 12L20.6143 5.18571C21.1286 4.67143 21.1286 3.9 20.6143 3.38571C20.1 2.87143 19.3286 2.87143 18.8143 3.38571L12 10.2L5.18571 3.38571C4.67143 2.87143 3.9 2.87143 3.38571 3.38571C2.87143 3.9 2.87143 4.67143 3.38571 5.18571L10.2 12L3.38571 18.8143C2.87143 19.3286 2.87143 20.1 3.38571 20.6143Z"
            fill={colors[0]}
        />
    </svg>
);
