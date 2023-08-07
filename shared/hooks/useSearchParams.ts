import { useEffect, useMemo, useState } from "react";
import qs from "qs";
import { useSearchParams as useSearchParamsNext } from "next/navigation";

type TransformerType = 'number' | 'nullable';

export function useSearchParams<T extends Record<string, any>>(defaultValue: T | null = null): T & Record<string, any> {
    const searchParams = useSearchParamsNext();

    const [searchParamsString, setSearchParamsString] = useState<string>(searchParams.toString());

    useEffect(() => {
        if (searchParams.toString() === searchParamsString) {
            return;
        }
        setSearchParamsString(searchParams.toString());
    }, [searchParams]);

    // shit code for nextjs 13 shallow routing fix [useNavigate]
    useEffect(() => {
        const handler = () => {
            setSearchParamsString(window.location.search.substring(1));
        }
        window.addEventListener('router.replace', handler);
        return () => window.removeEventListener('router.replace', handler);
    }, []);

    return useMemo(() => {
        if (!searchParamsString) {
            return defaultValue;
        }
        const parsed = qs.parse(searchParamsString, {
            interpretNumericEntities: true,
        });
        const result: Record<string, any> = defaultValue ? { ...defaultValue } : {};
        for (let key in parsed) {
            result[key] = parsed[key];
        }
        return result;
    }, [defaultValue, searchParamsString]) as T & Record<string, any>;
}
