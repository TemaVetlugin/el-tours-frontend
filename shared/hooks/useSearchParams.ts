import { useEffect, useState } from "react";
import qs from "qs";
import { useSearchParams as useSearchParamsNext } from "next/navigation";

export function useSearchParams<T extends Record<string, any>>(defaultValue: T): T & Record<string, any> {
    const [searchParamsString, setSearchParamsString] = useState<string>('');

    const searchParams = useSearchParamsNext();
    useEffect(() => {
        setSearchParamsString(searchParams.toString());
    }, [searchParams]);

    // shit code for nextjs 13 shallow routing fix [useNavigate]
    useEffect(() => {
        const handler = () => {
            setSearchParamsString(window.location.search.substring(1));
        }
        window.addEventListener('historyReplace', handler);
        return () => window.removeEventListener('historyReplace', handler);
    }, []);

    if (!searchParamsString) {
        return defaultValue;
    }
    const parsed = qs.parse(searchParamsString);
    const result: Record<string, any> = { ...defaultValue };
    for (let key in parsed) {
        result[key] = parsed[key];
    }
    return {
        ...defaultValue,
        ...parsed
    } as T & Record<string, any>;
}
