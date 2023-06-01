import { runInAction } from "mobx";

export function useAction<T extends (...args: any[]) => void>(callback: T) {
    return ((...args: any[]) => {
        runInAction(() => {
            callback(...args);
        });
    }) as T;
};
