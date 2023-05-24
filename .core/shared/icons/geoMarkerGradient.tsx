import React from "react";
import { IconType } from "./index";

export const geoMarkerGradient: IconType = (size, colorsz) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.25 10.5C2.25 5.03039 6.64344 1.25 12 1.25C17.3566 1.25 21.75 5.03039 21.75 10.5C21.75 14.6709 19.8844 17.7331 17.7656 19.739C16.7091 20.7393 15.5844 21.4828 14.5831 21.9791C13.6066 22.4631 12.6707 22.7498 12 22.7498C11.3293 22.7498 10.3934 22.4631 9.41692 21.9791C8.41559 21.4828 7.29094 20.7393 6.23437 19.739C4.1156 17.7331 2.25 14.6709 2.25 10.5ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
            fill="url(#paint0_linear_2326_44059)"
        />
        <defs>
            <linearGradient id="paint0_linear_2326_44059" x1="12" y1="1.25" x2="12" y2="22.7498" gradientUnits="userSpaceOnUse">
                <stop stopColor="#BFC754"/>
                <stop offset="1" stopColor="#5DA14C"/>
            </linearGradient>
        </defs>
    </svg>
);
