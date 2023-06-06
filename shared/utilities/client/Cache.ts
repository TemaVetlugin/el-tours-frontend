import type { CacheType } from "../types/Cache.type";
import qs from "qs";

export const Cache = new class implements CacheType {
    key = (value: any): string => {
        if (!value) {
            return 'default';
        }
        if (Array.isArray(value)) {
            return value.map(this.key).sort().join(',');
        }
        if (typeof value === 'object') {
            return qs.stringify(value);
        }
        return `${value}`;
    }

    get = async <T>(key: any) => {
        let itemJson = await localStorage.getItem(this.key(key));
        if (!itemJson) {
            return null;
        }
        try {
            const item = JSON.parse(itemJson);
            if (!item.hasOwnProperty('expiry') || !item.hasOwnProperty('value') || (Date.now() > item.expiry && item.expiry !== -1)) {
                return null;
            }
            return item.value as T;
        } catch (e) {
        }
        return null;
    }

    set = async (key: any, value: any, ttl?: number) => {
        localStorage.setItem(this.key(key), JSON.stringify({
            expiry: ttl ? Date.now() + ttl * 1000 : -1,
            value
        }));
    }

    remember = async <T>(key: any, fallback: () => Promise<T>, ttl?: number) => {
        let result = await this.get<T>(key);
        if (result === null) {
            result = await fallback();
            await this.set(key, result, ttl);
        }
        return result;
    }
}
