import { ROUTES } from "shared/contants";

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;
export type UrlType = RouteType | string | null | undefined;
