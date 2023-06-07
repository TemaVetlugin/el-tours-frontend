import qs from "qs";
import { usePathname, useRouter } from "next/navigation";

export function useNavigate() {
    const router = useRouter();
    const pathname = usePathname();
    return (route: string | null, params?: Record<string, any>, replace = false) => {
        let url = route || pathname;
        if (!!params) {
            url = url + '?' + qs.stringify(params, {
                arrayFormat: 'brackets'
            });
        }

        if (replace) {
            router.replace(url)

            // https://github.com/vercel/next.js/discussions/48110
            // shit code for nextjs 13 shallow routing fix
            // history.pushState({}, "", url);
            // history.replaceState({}, "", url);
            // window.dispatchEvent(new Event('historyReplace'));
        } else {
            router.push(url);
        }
    }
}
