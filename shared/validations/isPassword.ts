import { ValidationHandlerType } from "shared/types";

export const isPassword: ValidationHandlerType = (errorMessage = 'Минимальная длина 8 символов') => (value) => {
    return ((value.length || 0) >= 8) || errorMessage;
}
