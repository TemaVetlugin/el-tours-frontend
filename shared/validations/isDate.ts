import validate from 'validator/lib/isDate';

import { ValidationHandlerType } from "./types";
import { isFalsy } from "shared/utilities";

export const isDate: ValidationHandlerType = (format: 'YYYY-MM-DD', errorMessage = 'Введите верную дату') => (value) => {
    return (isFalsy(value) || validate(value, {
        format,
        delimiters: ['-', '/', '.']
    })) || errorMessage;
}
