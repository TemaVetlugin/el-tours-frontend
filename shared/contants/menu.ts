import { MenuItemType } from "shared/types";

import { ROUTES } from "./routes";

export const MENU = {
    HOME: (): MenuItemType => ({
        name: 'Главная',
        href: ROUTES.HOME()
    }),
    CART: (): MenuItemType => ({
        name: 'Корзина',
        href: ROUTES.CART()
    }),
    FAVORITE: (): MenuItemType => ({
        name: 'Избранное',
        href: ROUTES.FAVORITE()
    }),
    CHECKOUT: (): MenuItemType => ({
        name: 'Оформление заказа',
        href: ROUTES.CHECKOUT()
    }),
    PRODUCT: (name = 'Каталог', slug = ''): MenuItemType => ({
        name,
        href: ROUTES.PRODUCT(slug ?? '')
    }),
    CATALOG: (name = 'Каталог', slug?: string): MenuItemType => ({
        name,
        href: ROUTES.CATALOG(slug)
    }),
    CATALOG_BY_NAME: (): MenuItemType => ({
        name: 'Список товаров по алфавиту',
        href: ROUTES.CATALOG_BY_NAME()
    }),
    ARTICLES: (): MenuItemType => ({
        name: 'Полезные статьи',
        href: ROUTES.ARTICLES()
    }),
    ARTICLE: (name = 'Статья', id = ''): MenuItemType => ({
        name,
        href: ROUTES.ARTICLE(id ?? 0)
    }),
    NEWS: (): MenuItemType => ({
        name: 'Новости',
        href: ROUTES.NEWS()
    }),
    NEWS_DETAIL: (name = 'Новость', id = ''): MenuItemType => ({
        name,
        href: ROUTES.NEWS_DETAIL(id ?? 0)
    }),
    FAQ: (): MenuItemType => ({
        name: 'Вопрос-ответ',
        href: ROUTES.FAQ()
    }),
    PROMO: (): MenuItemType => ({
        name: 'Акции',
        href: ROUTES.PROMO()
    }),
    COMPILATIONS: (): MenuItemType => ({
        name: 'Подборки',
        href: ROUTES.COMPILATIONS()
    }),
    COMPILATION: (name = 'Подборка', id = ''): MenuItemType => ({
        name,
        href: ROUTES.PRODUCT(id ?? '')
    }),
    PROMO_DETAIL: (): MenuItemType => ({
        name: 'Карта здоровья',
        href: ROUTES.PROMO_DETAIL()
    }),
    FEEDBACK: (): MenuItemType => ({
        name: 'Отзывы',
        href: ROUTES.FEEDBACK()
    }),
    COMPANY: (): MenuItemType => ({
        name: 'О компании',
        href: ROUTES.COMPANY()
    }),
    ABOUT: (): MenuItemType => ({
        name: 'О нас',
        href: ROUTES.ABOUT()
    }),
    STORES: (): MenuItemType => ({
        name: 'Аптеки',
        href: ROUTES.STORES()
    }),
    SEARCH: (): MenuItemType => ({
        name: 'Результаты поиска',
        href: ROUTES.SEARCH()
    }),
    PROFILE: (): MenuItemType => ({
        name: 'Личные данные',
        href: ROUTES.PROFILE()
    }),
    PROFILE_ORDERS: (): MenuItemType => ({
        name: 'Мои заказы',
        href: ROUTES.PROFILE_ORDERS()
    }),
    PROFILE_ADDRESS: (): MenuItemType => ({
        name: 'Адреса доставки',
        href: ROUTES.PROFILE_ADDRESS()
    }),
};
