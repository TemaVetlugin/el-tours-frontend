import validate from 'validator/lib/isDate';

import { ValidationHandlerType } from "shared/types";
import { isFalsyValue } from "shared/utilities";

export const isDate: ValidationHandlerType = (format: 'YYYY-MM-DD', errorMessage = 'Введите верную дату') => (value) => {
    return (isFalsyValue(value) || validate(value, {
        format,
        delimiters: ['-', '/', '.']
    })) || errorMessage;
}
