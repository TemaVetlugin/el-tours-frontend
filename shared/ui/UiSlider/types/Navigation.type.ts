import React from "react";

export type NavigationType = {
    prev: () => void,
    next: () => void,
    current: () => number,
    pages: () => number,
    dots: (className: string) => React.ReactNode[],
    total: () => number,
    set: (slide: number) => void
}
