import validate from 'validator/lib/isEmail';

import { ValidationHandlerType } from "shared/types";
import { isFalsyValue } from "shared/utilities";

export const isEmail: ValidationHandlerType = (errorMessage = 'Неверный формат') => (value) => {
    return (isFalsyValue(value) || validate(value)) || errorMessage;
}
