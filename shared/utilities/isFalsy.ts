export const isFalsy = (value: any) => {
    if (value === undefined || value === null || value === false || value === '') {
        return true;
    }
    return false;
}
