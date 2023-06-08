import React from "react";
import { IconType } from "./index";

export const close: IconType = (size, colors) => (
    <svg width={size[0]} height={size[1]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.3536 13.4464L12 13.0929L11.6464 13.4464L4.83216 20.2607C4.73311 20.3598 4.65392 20.4142 4.58086 20.4467C4.50997 20.4782 4.42023 20.5 4.28571 20.5C4.1512 20.5 4.06146 20.4782 3.99057 20.4467C3.91751 20.4142 3.83832 20.3598 3.73927 20.2607C3.42024 19.9417 3.42024 19.4869 3.73927 19.1678L10.5536 12.3536L10.9071 12L10.5536 11.6464L3.73927 4.83216C3.42024 4.51314 3.42024 4.05829 3.73927 3.73927C4.05829 3.42024 4.51314 3.42024 4.83216 3.73927L11.6464 10.5536L12 10.9071L12.3536 10.5536L19.1678 3.73927C19.4869 3.42024 19.9417 3.42024 20.2607 3.73927C20.5798 4.05829 20.5798 4.51314 20.2607 4.83216L13.4464 11.6464L13.0929 12L13.4464 12.3536L20.2607 19.1678C20.5798 19.4869 20.5798 19.9417 20.2607 20.2607C20.189 20.3324 20.0894 20.395 19.9786 20.4393C19.8656 20.4845 19.7681 20.5 19.7143 20.5C19.6605 20.5 19.563 20.4845 19.45 20.4393C19.3391 20.395 19.2395 20.3324 19.1678 20.2607L12.3536 13.4464Z"
            fill={colors[0]}
            stroke={colors[0]}
        />
    </svg>
);