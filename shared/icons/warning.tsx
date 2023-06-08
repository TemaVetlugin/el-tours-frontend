import React from "react";
import { IconType } from "./index";

export const warning: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M13.0012 1.63159V1.63159C19.2804 1.63159 24.3697 6.72085 24.3697 13V13C24.3697 19.2792 19.2804 24.3684 13.0012 24.3684V24.3684C6.72208 24.3684 1.63281 19.2792 1.63281 13V13C1.63281 6.72085 6.72208 1.63159 13.0012 1.63159Z"
              stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <path d="M13.0027 13.6316V7.3158" stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round"
        />
        <path
            d="M13.0014 18.0526C12.8271 18.0526 12.6856 18.1941 12.6869 18.3684C12.6869 18.5427 12.8284 18.6842 13.0027 18.6842C13.177 18.6842 13.3185 18.5427 13.3185 18.3684C13.3185 18.1941 13.177 18.0526 13.0014 18.0526"
            stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);
