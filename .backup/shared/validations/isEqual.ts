import { ValidationHandlerType } from "shared/types";

export const isEqual: ValidationHandlerType = (entryValue, errorMessage = 'Значение должно совпадать') => (value) => {
    return entryValue === value || errorMessage;
}
