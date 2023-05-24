export const Cache = new class {
    get = async <T, K>(key: string, fallback: K): Promise<T | K> => {
        let value = await localStorage.getItem(key);
        if (!value) {
            return fallback
        }
        try {
            return JSON.parse(value) as T;
        } catch (e) {
            return fallback;
        }
    }

    set = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
