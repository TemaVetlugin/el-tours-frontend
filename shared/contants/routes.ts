type RouteType = {
    id: string
    name: string
    url: string,
}
export const ROUTES = {
    CATALOG: (slug: string = '', name = 'Каталог'): RouteType => ({
        id: 'catalog' + slug,
        name,
        url: slug ? `/catalog/${slug}` : '/catalog',
    }),
    COMPILATION: (slug: string = ''): RouteType => ({
        id: 'search',
        name: 'COMPILATION',
        url: `/compilation/${slug}`,
    }),
    COMPILATIONS: (): RouteType => ({
        id: 'compilations',
        name: 'Подборки',
        url: `/compilations`,
    }),
    HOME: (): RouteType => ({
        id: 'home',
        name: 'Главная',
        url: '/',
    }),
    SEARCH: (): RouteType => ({
        id: 'search',
        name: 'Поиск',
        url: '/search',
    }),
    STORES: (): RouteType => ({
        id: 'stores',
        name: 'Аптеки',
        url: '/stores',
    }),
};
