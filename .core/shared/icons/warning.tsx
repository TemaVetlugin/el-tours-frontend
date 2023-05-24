import React from "react";
import { IconType } from "./index";

export const warning: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 13.1199V9.37988" stroke="#444449"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11.999 16.125C11.861 16.125 11.749 16.237 11.75 16.375C11.75 16.513 11.862 16.625 12 16.625C12.138 16.625 12.25 16.513 12.25 16.375C12.25 16.237 12.138 16.125 11.999 16.125"
            stroke={colors[0]}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.0288 4.13894L21.6878 17.5429C22.5778 19.1009 21.4528 21.0399 19.6588 21.0399H4.34076C2.54576 21.0399 1.42076 19.1009 2.31176 17.5429L9.97076 4.13894C10.8678 2.56794 13.1318 2.56794 14.0288 4.13894Z"
            stroke={colors[0]}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
