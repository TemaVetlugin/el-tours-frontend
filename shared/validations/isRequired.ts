import { ValidationHandlerType } from "./types";

export const isRequired: ValidationHandlerType = (errorMessage = 'Обязательное поле') => (value) => {
    return !!value || errorMessage;
}
