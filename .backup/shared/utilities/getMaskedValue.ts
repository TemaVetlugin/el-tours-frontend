import { IMask } from "react-imask";

export const getMaskedValue = (mask: string, value: any) => {
    return IMask.createMask({ mask }).resolve(value || '');
}
