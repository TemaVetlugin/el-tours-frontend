import { ValidationHandlerType } from "./types";
import { isFalsy } from "shared/utilities";

export const isMobilePhone: ValidationHandlerType = (errorMessage = 'Обязательное поле') => (value) => {
    const phone = typeof value === 'string' ? value : '';
    const isValid = isFalsy(value) || phone.replace(/[^0-9.]/g, '').length === 11;
    return isValid || errorMessage;
}
