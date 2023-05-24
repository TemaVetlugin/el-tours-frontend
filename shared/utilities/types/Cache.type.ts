export type CacheType = {
    key: (value: any) => string,
    get: <T>(key: any) => Promise<T | null>,
    set: (key: any, value: any, ttl?: number) => Promise<void>,
    remember: <T>(key: any, fallback: () => Promise<T>, ttl?: number) => Promise<T>
}
