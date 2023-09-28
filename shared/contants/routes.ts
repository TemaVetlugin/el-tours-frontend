type RouteType = {
    id: string
    name: string
    url: string,
}
export const ROUTES = {
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
    TOUR: (slug: string = '', name = 'Туры'): RouteType => ({
        id: 'tour' + slug,
        name,
        url: slug ? `/tour/${slug}` : '/tour',
    }),
    VISA: (slug: string = '', name = 'Визы'): RouteType => ({
        id: 'visa' + slug,
        name,
        url: slug ? `/visa/slug` : '/visa',
    }),
    COUNTRY: (slug: string = '', name = 'Страны'): RouteType => ({
        id: 'country' + slug,
        name,
        url: slug ? `/country/${slug}` : '/country',
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
    COMPANY: (): RouteType => ({
        id: 'COMPANY',
        name: 'О компании',
        url: '/company',
    }),
    SERVICES: (): RouteType => ({
        id: 'SERVICES',
        name: 'Услуги',
        url: '/services',
    }),
    CREDIT: (): RouteType => ({
        id: 'CREDIT',
        name: 'Рассрочка и кредит',
        url: '/credit',
    }),
    NOT_FOUND: (): RouteType => ({
        id: 'NOT_FOUND',
        name: 'Не найдено',
        url: '/not-found',
    }),
};
