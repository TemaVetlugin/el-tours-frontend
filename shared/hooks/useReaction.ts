import { useEffect } from "react";
import { reaction, toJS } from "mobx";

export function useReaction<T>(callback: (value: T, previousValue: T) => void, dependency: () => T, initial = true) {
    useEffect(() => {
        if (initial) {
            callback(dependency(), dependency());
        }
        return reaction(dependency, callback);
    }, [dependency, callback]);
}
