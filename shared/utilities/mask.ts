'use client';

import { IMask } from "react-imask";

export const mask = (mask: string, value: any) => {
    return IMask.createMask({ mask }).resolve(value || '');
}
