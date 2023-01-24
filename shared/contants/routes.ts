export const ROUTES = {
    CATALOG: (slug?: string) => slug ? `/catalog/${slug}` : '/catalog',
    CATALOG_BY_NAME: () => '/catalog/by-name',
    HOME: () => '/',
    CART: () => '/cart',
    PROMO_ACTIONS: () => '/promo-actions',
    PROMO_ACTION: (slug: string) => `/promo-actions/${slug}`,
    FAVORITE: () => '/favorite',
    CHECKOUT: () => '/checkout',
    PRODUCT: (slug: string) => `/product/${slug}`,
    ARTICLES: () => '/articles',
    ARTICLE: (slug: string) => `/articles/${slug}`,
    NEWS: () => '/news',
    NEWS_DETAIL: (slug: string) => `/news/${slug}`,
    FAQ: () => '/faq',
    PROMO: () => '/promo',
    SEARCH: () => '/search',
    PROMO_DETAIL: () => '/promo/detail',
    FEEDBACK: () => '/feedback',
    COMPANY: () => '/company',
    ABOUT: () => '/about',
    PROFILE: () => '/profile',
    STORES: () => '/stores',
    STORE: (id: number) => `/stores/${id}`,
    COMPILATIONS: () => `/compilations`,
    COMPILATION: (slug: string) => `/compilations/${slug}`,
    PROFILE_ORDERS: () => '/profile/orders',
    PROFILE_ORDER: (id: number | string = '[id]') => `/profile/orders/${id}`,
    PROFILE_ADDRESS: () => '/profile/address',
    ERROR_404: () => '/error/404',
    P_PERSONAL_DATA: () => '/p/personal-data',
    P_PRIVACY: () => '/p/privacy',
    CONTACTS: () => '/contacts',
};
