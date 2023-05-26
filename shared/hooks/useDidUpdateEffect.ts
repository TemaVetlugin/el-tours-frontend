import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useDidUpdateEffect(effectCallback: EffectCallback, dependencyList: DependencyList) {
    const ref = useRef(false);

    useEffect(() => {
        if (ref.current) {
            return effectCallback();
        }
        ref.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyList);
}
