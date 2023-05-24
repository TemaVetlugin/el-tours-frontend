import { useDebounce } from "use-debounce";

export function useDebouncedValue <T>(value: T, delay: number = 250): T {
    const [debouncedValue] = useDebounce(value, delay);
    return debouncedValue;
};
