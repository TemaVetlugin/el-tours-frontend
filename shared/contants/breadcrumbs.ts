import { ROUTES } from "./routes";

export type BreadcrumbItemType = {
    name: string,
    href: string
}

export const BREADCRUMBS = {
    HOME: (): BreadcrumbItemType => ({
        name: 'Главная',
        href: ROUTES.HOME()
    }),
    CART: (): BreadcrumbItemType => ({
        name: 'Корзина',
        href: ROUTES.CART()
    }),
    FAVORITE: (): BreadcrumbItemType => ({
        name: 'Избранное',
        href: ROUTES.FAVORITE()
    }),
    CHECKOUT: (): BreadcrumbItemType => ({
        name: 'Оформление заказа',
        href: ROUTES.CHECKOUT()
    }),
    PRODUCT: (name = 'Каталог', slug = ''): BreadcrumbItemType => ({
        name,
        href: ROUTES.PRODUCT(slug ?? '')
    }),
    CATALOG: (name = 'Каталог', slug?: string): BreadcrumbItemType => ({
        name,
        href: ROUTES.CATALOG(slug)
    }),
    CATALOG_BY_NAME: (): BreadcrumbItemType => ({
        name: 'Список товаров по алфавиту',
        href: ROUTES.CATALOG_BY_NAME()
    }),
    ARTICLES: (): BreadcrumbItemType => ({
        name: 'Интересно',
        href: ROUTES.ARTICLES()
    }),
    ARTICLE: (name = 'Статья', id = ''): BreadcrumbItemType => ({
        name,
        href: ROUTES.ARTICLE(id ?? 0)
    }),
    NEWS: (): BreadcrumbItemType => ({
        name: 'Новости',
        href: ROUTES.NEWS()
    }),
    NEWS_DETAIL: (name = 'Новость', id = ''): BreadcrumbItemType => ({
        name,
        href: ROUTES.NEWS_DETAIL(id ?? 0)
    }),
    FAQ: (): BreadcrumbItemType => ({
        name: 'Вопрос-ответ',
        href: ROUTES.FAQ()
    }),
    PROMO: (): BreadcrumbItemType => ({
        name: 'Акции',
        href: ROUTES.PROMO()
    }),
    COMPILATIONS: (): BreadcrumbItemType => ({
        name: 'Подборки',
        href: ROUTES.COMPILATIONS()
    }),
    COMPILATION: (name = 'Подборка', id = ''): BreadcrumbItemType => ({
        name,
        href: ROUTES.PRODUCT(id ?? '')
    }),
    PROMO_DETAIL: (): BreadcrumbItemType => ({
        name: 'Карта здоровья',
        href: ROUTES.PROMO_DETAIL()
    }),
    FEEDBACK: (): BreadcrumbItemType => ({
        name: 'Отзывы',
        href: ROUTES.FEEDBACK()
    }),
    COMPANY: (): BreadcrumbItemType => ({
        name: 'О компании',
        href: ROUTES.COMPANY()
    }),
    ABOUT: (): BreadcrumbItemType => ({
        name: 'О нас',
        href: ROUTES.ABOUT()
    }),
    STORES: (): BreadcrumbItemType => ({
        name: 'Аптеки',
        href: ROUTES.STORES()
    }),
    SEARCH: (): BreadcrumbItemType => ({
        name: 'Результаты поиска',
        href: ROUTES.SEARCH()
    }),
    PROFILE: (): BreadcrumbItemType => ({
        name: 'Личные данные',
        href: ROUTES.PROFILE()
    }),
    PROFILE_ORDERS: (): BreadcrumbItemType => ({
        name: 'Мои заказы',
        href: ROUTES.PROFILE_ORDERS()
    }),
    PROFILE_ADDRESS: (): BreadcrumbItemType => ({
        name: 'Адреса доставки',
        href: ROUTES.PROFILE_ADDRESS()
    }),
    CONTACTS: (): BreadcrumbItemType => ({
        name: 'Контакты',
        href: ROUTES.CONTACTS()
    }),
    LICENSES: (): BreadcrumbItemType => ({
        name: 'Лицензии',
        href: ROUTES.LICENSES()
    }),
};
