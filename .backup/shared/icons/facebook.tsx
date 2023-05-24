import React from "react";
import { IconType } from "./index";

export const facebook: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="9" width="15" height="23" fill="white"/>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.52674 3.51943C7.72931 -2.1986 15.8568 -0.839872 28.1067 6.80052C43.9644 16.6913 43.9644 23.3086 28.1067 33.1994C15.9425 40.7866 7.84292 42.1793 3.6153 36.5992C-1.19451 30.2508 -1.186 9.93175 3.52674 3.51943ZM18.0853 20.8785V31.7596H13.5832V20.8789H11.334V17.1293H13.5832V14.878C13.5832 11.819 14.8533 10 18.4616 10H21.4657V13.7501H19.588C18.1833 13.7501 18.0904 14.2741 18.0904 15.2521L18.0853 17.1288H21.487L21.0889 20.8785H18.0853Z"
            fill={colors[0]}
        />
    </svg>
);
