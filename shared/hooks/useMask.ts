import { IMask } from "react-imask";

export const useMask = (mask: string, value: any) => {
    return IMask.createMask({ mask }).resolve(value || '');
}
