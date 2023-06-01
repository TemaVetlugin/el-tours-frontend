import validate from 'validator/lib/isEmail';

import { ValidationHandlerType } from "./types";
import { isFalsy } from "shared/utilities";

export const isEmail: ValidationHandlerType = (errorMessage = 'Неверный формат') => (value) => {
    return (isFalsy(value) || validate(value)) || errorMessage;
}
