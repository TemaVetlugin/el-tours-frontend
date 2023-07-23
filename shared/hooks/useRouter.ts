import { useMemo } from "react";
import { usePathname, useRouter as useRouterNext } from "next/navigation";

import { url } from "shared/utilities";
import { UrlType } from "shared/types";

export function useRouter() {
    const router = useRouterNext();
    const pathname = usePathname();

    return useMemo(() => {
        return {
            back: () => router.back(),
            forward: () => router.forward(),
            refresh: () => router.refresh(),
            push: (href: UrlType, params?: Record<string, any>) => {
                router.push(url(href, params));
            },
            replace: (href: UrlType, params?: Record<string, any>) => {
                // console.log('replace')
                // https://github.com/vercel/next.js/discussions/48110
                // shit code for nextjs 13 shallow routing fix
                const to = url(href, params);
                history.replaceState({
                    ...history.state,
                    as: to,
                    new: to
                }, "", to);
                window.dispatchEvent(new Event('router.replace'));
                // router.replace(toUrl(href, params))
            },
        }
    }, [pathname, router]);
}