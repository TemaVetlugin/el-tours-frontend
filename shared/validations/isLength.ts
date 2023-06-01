import { ValidationHandlerType } from "./types";
import { isFalsy } from "shared/utilities";

export const isLength: ValidationHandlerType = (length: number | [number, number]) => (value: any) => {
    if (isFalsy(value)) {
        return true;
    }

    let string = (value ? `${value}` : '');
    const stringLength = string.length;

    if (Array.isArray(length)) {
        if (length.length < stringLength) {
            return `Длина должна быть более ${length[0]}`;
        }

        if (length.length > stringLength) {
            return `Длина должна быть менее ${length[1]}`;
        }
    }

    return stringLength === length || `Обязательное поле`;
}
