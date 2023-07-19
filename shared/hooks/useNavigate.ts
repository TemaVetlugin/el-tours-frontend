import qs from "qs";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "shared/contants";

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

export function useNavigate() {
    const router = useRouter();
    const pathname = usePathname();
    return (route: string | RouteType | null, params?: Record<string, any>, replace = false) => {
        let url: string = '#';
        if (route === null) {
            url = pathname;
        } else if (typeof route === 'string') {
            url = route;
        } else if (typeof route === 'object' && route && 'url' in route) {
            url = route.url
        }

        if (!!params) {
            url = url + '?' + qs.stringify(params, {
                arrayFormat: 'brackets',
                skipNulls: true
            });
        }

        if (replace) {
            // router.replace(url);
            // https://github.com/vercel/next.js/discussions/48110
            // shit code for nextjs 13 shallow routing fix
            history.replaceState({
                ...history.state,
                as: url,
                new: url
            }, "", url);
            window.dispatchEvent(new Event('router.replace'));
        } else {
            router.push(url);
        }
    }
}
