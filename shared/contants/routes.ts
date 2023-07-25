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
    CATALOG_MARK: (id: string = '', name = 'Каталог'): RouteType => ({
        id: 'catalog' + id,
        name,
        url: id ? `/catalog/mark/${id}` : '/catalog',
    }),
    CATALOG_BRAND: (id: number = 0, name = 'Бренд'): RouteType => ({
        id: 'catalog' + id,
        name,
        url: id ? `/catalog/brand/${id}` : '/catalog',
    }),
    CATALOG_MANUFACTURER: (id: number = 0, name = 'Производитель'): RouteType => ({
        id: 'catalog' + id,
        name,
        url: id ? `/catalog/manufacturer/${id}` : '/catalog',
    }),
    CATALOG_SUBSTANCE: (id: number = 0, name = 'Действующее вещество'): RouteType => ({
        id: 'catalog' + id,
        name,
        url: id ? `/catalog/substance/${id}` : '/catalog',
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
    NEWS: (slug: string = '', name = 'Новости'): RouteType => ({
        id: 'news' + slug,
        name,
        url: slug ? `/news/${slug}` : '/news',
    }),
    PROMO_ACTIONS: (slug: string = '', name = 'Акции'): RouteType => ({
        id: 'promo_actions' + slug,
        name,
        url: slug ? `/promo-actions/${slug}` : '/promo-actions',
    }),
    ARTICLES: (slug: string = '', name = 'Интересно'): RouteType => ({
        id: 'articles' + slug,
        name,
        url: slug ? `/articles/${slug}` : '/articles',
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
    PAGE: (slug: string, name: string): RouteType => ({
        id: 'stores',
        name,
        url: `/page/${slug}`,
    }),
};
