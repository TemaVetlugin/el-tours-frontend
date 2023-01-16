import { useRouter } from "next/router";
import { useMemo } from "react";

export function useRouterQuery<T>(byDefault: T): T & Record<string, any> {
    const router = useRouter();
    return useMemo(() => ({ ...byDefault, ...router.query }), [router.query]) as T & Record<string, any>;
};
