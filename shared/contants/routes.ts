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
        name: 'Лицензии',
        url: '/licenses',
    }),
    CONTACTS: (): RouteType => ({
        id: 'contacts',
        name: 'Контакты',
        url: '/contacts',
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
    CATALOG_NAME: (id: string = '', name = 'Товары по алфавиту'): RouteType => ({
        id: 'catalog' + id,
        name,
        url: id ? `/catalog/name/${id}` : '/catalog',
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
    NOT_FOUND: (): RouteType => ({
        id: 'search',
        name: 'Страница не найдена',
        url: `/404`,
    }),
    COMPILATIONS: (slug: string = '', name = 'Подборки'): RouteType => ({
        id: 'compilations' + slug,
        name,
        url: slug ? `/compilations/${slug}` : '/compilations',
    }),
    FAVORITES: (): RouteType => ({
        id: 'favorites',
        name: 'Избранное',
        url: '/favorites',
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
    PRODUCT: ({ slug, name, externalId }: { slug?: string | null, name?: string, externalId?: string | null }): RouteType => ({
        id: 'product' + slug,
        name: name || 'Каталог',
        url: `/product/${slug || externalId}`,
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

    HOME: (): RouteType => ({
        id: 'home',
        name: 'Главная',
        url: '/',
    }),
    ARTICLES: (slug: string = '', name = 'Блог'): RouteType => ({
        id: 'article' + slug,
        name,
        url: slug ? `/article/${slug}` : '/article',
    }),
    VACANCY: (slug: string = '', name = 'Вакансии'): RouteType => ({
        id: 'vacancy' + slug,
        name,
        url: slug ? `/vacancy/${slug}` : '/vacancy',
    }),
    VISA: (slug: string = '', name = 'Визы'): RouteType => ({
        id: 'visa' + slug,
        name,
        url: slug ? `/visa/${slug}` : '/visa',
    }),
    LOGIN: (): RouteType => ({
        id: 'LOGIN',
        name: 'Вход',
        url: '/login',
    }),
    TEAM: (): RouteType => ({
        id: 'TEAM',
        name: 'Наша Команда',
        url: '/team',
    }),
};
