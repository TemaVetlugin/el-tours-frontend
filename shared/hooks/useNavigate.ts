import qs from "qs";
import { useRouter } from "next/navigation";

export function useNavigate() {
    const router = useRouter();
    return (route: string, params?: Record<string, any>) => {
        if (!params) {
            router.push(route);
            return;
        }
        router.push(route + '?' + qs.stringify(params));
    }
}
