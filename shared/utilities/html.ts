'use client';

import parse from 'html-react-parser';

export const html = (value: string | null | undefined) => {
    if (!value) {
        return '';
    }

    return parse(value);
}
