import React from "react";
import { IconType } from "./index";

export const geo: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.75 10.5C3.75 5.96961 7.35656 2.75 12 2.75C16.6434 2.75 20.25 5.96961 20.25 10.5C20.25 14.1809 18.6156 16.8687 16.7344 18.6497C15.7909 19.5429 14.7906 20.2021 13.9169 20.6352C13.0184 21.0805 12.3293 21.2498 12 21.2498C11.6707 21.2498 10.9816 21.0805 10.0831 20.6352C9.20941 20.2021 8.20906 19.5429 7.26563 18.6497C5.3844 16.8687 3.75 14.1809 3.75 10.5ZM12 1.25C6.64344 1.25 2.25 5.03039 2.25 10.5C2.25 14.6709 4.1156 17.7331 6.23437 19.739C7.29094 20.7393 8.41559 21.4828 9.41692 21.9791C10.3934 22.4631 11.3293 22.7498 12 22.7498C12.6707 22.7498 13.6066 22.4631 14.5831 21.9791C15.5844 21.4828 16.7091 20.7393 17.7656 19.739C19.8844 17.7331 21.75 14.6709 21.75 10.5C21.75 5.03039 17.3566 1.25 12 1.25ZM9.75 11C9.75 9.75736 10.7574 8.75 12 8.75C13.2426 8.75 14.25 9.75736 14.25 11C14.25 12.2426 13.2426 13.25 12 13.25C10.7574 13.25 9.75 12.2426 9.75 11ZM12 7.25C9.92893 7.25 8.25 8.92893 8.25 11C8.25 13.0711 9.92893 14.75 12 14.75C14.0711 14.75 15.75 13.0711 15.75 11C15.75 8.92893 14.0711 7.25 12 7.25Z"
            fill={colors[0]}
        />
    </svg>
);