import { useMemo } from "react";
import { usePathname, useRouter as useRouterNext } from "next/navigation";
import qs from "qs";

import { ROUTES } from "shared/contants";

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

export function useRouter() {
    const router = useRouterNext();
    const pathname = usePathname();

    return useMemo(() => {
        const toUrl = (route: RouteType | string | null, params?: Record<string, any>) => {
            let url: string = '#';
            if (route === null) {
                url = pathname;
            } else if (typeof route === 'string') {
                url = route;
            } else if (typeof route === 'object' && route && 'url' in route) {
                url = route.url
            }
            if (!!params) {
                return url + '?' + qs.stringify(params, {
                    arrayFormat: 'brackets',
                    skipNulls: true
                });
            }
            return url;
        }

        return {
            back: () => router.back(),
            forward: () => router.forward(),
            refresh: () => router.refresh(),
            push: (href: RouteType | string | null, params?: Record<string, any>) => {
                router.push(toUrl(href, params));
            },
            replace: (href: RouteType | string | null, params?: Record<string, any>) => {
                // https://github.com/vercel/next.js/discussions/48110
                // shit code for nextjs 13 shallow routing fix
                const url = toUrl(href, params);
                history.replaceState({
                    ...history.state,
                    as: url,
                    new: url
                }, "", url);
                window.dispatchEvent(new Event('router.replace'));
            },
        }
    }, [pathname, router]);
}
