import { DependencyList, useEffect } from "react";

export function useAsyncEffect(effectCallback: () => Promise<void>, dependencyList: DependencyList) {
    useEffect(() => {
        effectCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyList);
}
