import React from 'react';

export function useLocationHash() {
    const [hash, setHash] = React.useState(() => {
        if (typeof window === 'undefined') {
            return '';
        }
        return window.location.hash;
    });

    const hashChangeHandler = React.useCallback(() => {
        setHash(window.location.hash);
    }, []);

    React.useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler);
        return () => {
            window.removeEventListener('hashchange', hashChangeHandler);
        };
    }, []);

    return hash;
};
