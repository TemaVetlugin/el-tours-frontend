import { useEffect, useState } from 'react';

import { useDebouncedValue } from "./useDebouncedValue";

export function useWindowBounds() {
    const [bounds, setBounds] = useState({
        width: 0,
        height: 0
    });
    useEffect(() => {
        function handleResize() {
            setBounds({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);
        document.addEventListener("DOMContentLoaded", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
            document.removeEventListener("DOMContentLoaded", handleResize);
        };
    }, []);

    return bounds;
}
