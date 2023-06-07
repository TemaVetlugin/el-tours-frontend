import qs from "qs";
import { usePathname, useRouter } from "next/navigation";

export function useNavigate() {
    const router = useRouter();
    const pathname = usePathname();
    return (route: string | null, params?: Record<string, any>) => {
        if (!params) {
            router.push(route || pathname);
            return;
        }
        router.push((route || pathname) + '?' + qs.stringify(params));
    }
}
