type RouteType = {
    id: string
    name: string
    url: string,
}
export const ROUTES = {
    CART: (): RouteType => ({
        id: 'cart',
        name: 'Корзина',
        url: '/cart',
    }),
    LICENSES: (): RouteType => ({
        id: 'LICENSES',
        name: 'Корзина',
        url: '/licenses',
    }),
    CATALOG: (slug: string = '', name = 'Каталог'): RouteType => ({
        id: 'catalog' + slug,
        name,
        url: slug ? `/catalog/${slug}` : '/catalog',
    }),
    ORDER: (id: string | number = ''): RouteType => ({
        id: 'order' + id,
        name: 'Заказ',
        url: `/order/${id}`,
    }),
    CHECKOUT: (): RouteType => ({
        id: 'checkout',
        name: 'Оформление заказа',
        url: '/checkout',
    }),
    COMPILATION: (slug: string = '', name = 'Подборка'): RouteType => ({
        id: 'search',
        name,
        url: `/compilation/${slug}`,
    }),
    NOT_FOUND: (): RouteType => ({
        id: 'search',
        name: 'Страница не найдена',
        url: `/404`,
    }),
    COMPILATIONS: (): RouteType => ({
        id: 'compilations',
        name: 'Подборки',
        url: `/compilations`,
    }),
    FAVORITES: (): RouteType => ({
        id: 'favorites',
        name: 'Избранное',
        url: '/favorites',
    }),
    HOME: (): RouteType => ({
        id: 'home',
        name: 'Главная',
        url: '/',
    }),
    PRODUCT: (slug: string = '', name = 'Каталог'): RouteType => ({
        id: 'product' + slug,
        name,
        url: `/product/${slug}`,
    }),
    PROFILE: (): RouteType => ({
        id: 'profile',
        name: 'Мой профиль',
        url: '/profile',
    }),
    PROFILE_ORDERS: (): RouteType => ({
        id: 'profile',
        name: 'Мои заказы',
        url: '/profile/orders',
    }),
    PROFILE_PREORDERS: (): RouteType => ({
        id: 'profile',
        name: 'Мои предзаказы',
        url: '/profile/preorders',
    }),
    PROFILE_REMINDERS: (): RouteType => ({
        id: 'profile',
        name: 'Напомнить',
        url: '/profile/reminders',
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
