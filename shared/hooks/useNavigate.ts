import qs from "qs";
import { useRouter } from "next/navigation";

export function useNavigate() {
    const router = useRouter();
    return (route: string, params?: Record<string, any>) => {
        router.push(route + '?' + qs.stringify(params));
    }
}
