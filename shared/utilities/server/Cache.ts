import IoRedis from "ioredis";
import type { CacheType } from "../types/Cache.type";
import qs from "qs";

export const Cache = new class implements CacheType {
    redis: IoRedis | null = null;

    constructor() {
        const isEnabled = process.env.REDIS_ENABLED === 'true';

        this.redis = isEnabled ? new IoRedis({
            port: +(process.env.REDIS_PORT || 6379),
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            db: +(process.env.REDIS_DB || 10), // Defaults to 0
        }) : null;
    }

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
        if (!this.redis) {
            return null;
        }
        let result = await this.redis.get(this.key(key));
        if (!result) {
            return null;
        }
        try {
            return JSON.parse(result) as T | null;
        } catch (e) {
        }
        return null;
    }

    set = async (key: any, value: any, ttl?: number) => {
        if (!this.redis) {
            return;
        }
        if (ttl && ttl > 0) {
            await this.redis.set(this.key(key), JSON.stringify(value), 'EX', ttl);
        } else {
            await this.redis.set(this.key(key), JSON.stringify(value));
        }
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
