import { useEffect } from "react";
import { reaction } from "mobx";

export function useReaction<T>(callback: (value: T, previousValue: T) => void, dependency: () => T) {
    useEffect(() => {
        return reaction(dependency, callback);
    }, [dependency, callback]);
}
