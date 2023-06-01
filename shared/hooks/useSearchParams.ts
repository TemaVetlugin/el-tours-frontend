import qs from "qs";
import { useSearchParams as useSearchParamsNext } from "next/navigation";

export function useSearchParams<T extends Record<string, any>>(defaultValue: T): T {
    const searchParams = useSearchParamsNext();
    const query = searchParams.toString();
    if (!query) {
        return defaultValue;
    }
    const parsed = qs.parse(query);
    const result: Record<string, any> = { ...defaultValue };
    for (let key in parsed) {
        if (result.hasOwnProperty(key)) {
            result[key] = parsed[key];
        }
    }
    return result as T;
}
