import IoRedis from 'ioredis';
import md5 from 'md5';

const isEnable = process.env.REDIS_ENABLE === 'true';
const ioRedis = isEnable ? new IoRedis({
    port: +(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    db: +(process.env.REDIS_DB || 10), // Defaults to 0
}) : null;

class _Redis {
    key = (value: any): string => {
        if (Array.isArray(value) && value !== null) {
            return value.map(this.key).sort().join('+');
        }
        if (typeof value === 'object' && value !== null) {
            let keys = Object.keys(value);
            if (value['module']) {
                let prefix = '';
                keys = keys.filter(key => key !== 'module').sort();
                prefix = Array.isArray(value['module'])
                    ? `${value['module'].join(':')}:`
                    : `${value['module']}:`;
                return prefix + md5(keys.map(key => {
                    return `${key}=${this.key(value[key])}`;
                }).join('|'));
            }
            return keys.map(key => {
                return `${key}=${this.key(value[key])}`;
            }).join('|');
        }
        return `${value}`;
    }

    flush = () => {
        ioRedis?.flushdb();
    }

    get = async <T = any>(key: any): Promise<T | null> => {
        if (!ioRedis) {
            return null;
        }
        let result = await ioRedis.get(this.key(key));
        try {
            if (result !== null) {
                return JSON.parse(result) as T | null;
            }
        } catch (e) {
        }
        return null;
    }

    set = async (key: any, value: any, ttl = -1) => {
        if (!ioRedis) {
            return;
        }
        if (ttl > 0) {
            await ioRedis.set(this.key(key), JSON.stringify(value), 'EX', ttl);
        } else {
            await ioRedis.set(this.key(key), JSON.stringify(value));
        }
    }

    cache = async <T = any>(key: any, value: () => Promise<T>, ttl = -1, force = false): Promise<T> => {
        if (!ioRedis) {
            return await value();
        }
        let result = !force ? await this.get<T>(this.key(key)) : null;
        if (result === null) {
            result = await value();
            await this.set(this.key(key), result, ttl);
        }
        return result;
    }
}

export const Redis = new _Redis();
