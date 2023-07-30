import { runInAction, set } from "mobx";

export function makeService<T>(Service: new () => T) {
    const service = new Service() as T & {
        set: <Key extends keyof T>(key: Key, value: T[Key]) => T[Key]
    };
    service.set = <Key extends keyof T>(key: Key, value: T[Key]): T[Key] => {
        if (service[key] !== value) {
            runInAction(() => {
                set(service, key, value);
            });
        }
        return value;
    };

    return service;
}
