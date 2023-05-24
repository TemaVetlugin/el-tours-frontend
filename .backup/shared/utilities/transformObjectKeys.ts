import { lodash } from './lodash'

export const transformObjectKeys = (data: any, transformer = lodash.camelCase) => {
    if (data === null || data === undefined) {
        return null;
    }

    let result: any;
    if (Array.isArray(data)) {
        result = data.map(item => transformObjectKeys(item, transformer));
    } else if (typeof data === 'object') {
        result = {};
        for (const [key, value] of Object.entries(data)) {
            const keyPostfix = key.includes('[]') ? '[]' : '';
            result[transformer(key) + keyPostfix] = transformObjectKeys(value, transformer);
        }
    } else {
        result = data;
    }
    return result;
};
