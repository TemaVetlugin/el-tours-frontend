import { ValidationHandlerType } from "shared/types";

export const isRequired: ValidationHandlerType = (errorMessage = 'Обязательное поле') => (value) => {
    return !!value || errorMessage;
}
