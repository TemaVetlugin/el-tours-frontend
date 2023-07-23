import qs from "qs";
import { ROUTES } from "shared/contants";

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

export const url = (href: string | RouteType | null | undefined, params?: Record<string, any>) => {
    let url: string = window.location.pathname;

    if (typeof href === 'string') {
        url = href;
    } else if (typeof href === 'object' && href && 'url' in href) {
        url = href.url
    }

    if (!!params) {
        return url + '?' + qs.stringify(params, {
            arrayFormat: 'brackets',
            skipNulls: true
        });
    }
    return url;
}
