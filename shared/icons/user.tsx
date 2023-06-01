import React from "react";
import { IconType } from "./index";

export const user: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 21.0001V19.0001C20 17.9393 19.5786 16.9218 18.8284 16.1717C18.0783 15.4216 17.0609 15.0001 16 15.0001H8C6.93913 15.0001 5.92172 15.4216 5.17157 16.1717C4.42143 16.9218 4 17.9393 4 19.0001V21.0001"
            stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M12 11.0001C14.2091 11.0001 16 9.20926 16 7.00012C16 4.79098 14.2091 3.00012 12 3.00012C9.79086 3.00012 8 4.79098 8 7.00012C8 9.20926 9.79086 11.0001 12 11.0001Z"
            stroke={colors[0]} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
