import validate from "validator/lib/isNumeric";

export const isNumeric = (value: any) => {
    if (value === undefined) {
        return false;
    }
    if (typeof value === 'number') {
        return true;
    }
    if (typeof value !== 'string') {
        return false;
    }
    return validate(value);
}
