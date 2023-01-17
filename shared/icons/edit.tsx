import React from "react";
import { IconType } from "./index";

export const edit: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17 3.00006C17.2626 2.73741 17.5744 2.52907 17.9176 2.38693C18.2608 2.24479 18.6286 2.17163 19 2.17163C19.3714 2.17163 19.7392 2.24479 20.0824 2.38693C20.4256 2.52907 20.7374 2.73741 21 3.00006C21.2626 3.2627 21.471 3.57451 21.6131 3.91767C21.7553 4.26083 21.8284 4.62862 21.8284 5.00006C21.8284 5.37149 21.7553 5.73929 21.6131 6.08245C21.471 6.42561 21.2626 6.73741 21 7.00006L7.5 20.5001L2 22.0001L3.5 16.5001L17 3.00006Z"
            stroke={colors[0]}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
