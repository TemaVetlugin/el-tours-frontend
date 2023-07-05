import React from "react";

import { IconType } from "./index";

export const exclamationTriangle: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.0013 8.74669V6.25336" stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path
            d="M8.00064 10.75C7.90864 10.75 7.83397 10.8246 7.83464 10.9166C7.83464 11.0086 7.9093 11.0833 8.0013 11.0833C8.0933 11.0833 8.16797 11.0086 8.16797 10.9166C8.16797 10.8246 8.0933 10.75 8.00064 10.75"
            stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M9.35121 2.75932L14.4572 11.6953C15.0505 12.734 14.3005 14.0266 13.1045 14.0266H2.89254C1.69587 14.0266 0.945873 12.734 1.53987 11.6953L6.64587 2.75932C7.24387 1.71198 8.75321 1.71198 9.35121 2.75932Z"
              stroke={colors[0]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
