import { ValidationHandlerType } from "./types";

export const isEqual: ValidationHandlerType = (entryValue, errorMessage = 'Значение должно совпадать') => (value) => {
    return entryValue === value || errorMessage;
}
