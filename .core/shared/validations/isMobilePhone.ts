import { ValidationHandlerType } from "shared/types";
import { isFalsyValue } from "shared/utilities";

export const isMobilePhone: ValidationHandlerType = (errorMessage = 'Обязательное поле') => (value) => {
    const phone = typeof value === 'string' ? value : '';
    const isValid = isFalsyValue(value) || phone.replace(/[^0-9.]/g, '').length === 11;
    return isValid || errorMessage;
}
