import React from "react";
import { observer } from "mobx-react";

import { COLORS, MEDIA_POINTS, ROUTES } from "shared/contants";

import { UiGrid, UiIcon, UiLink, UiWrap } from "shared/uikit";
import { CBackCallRequestCreate } from "shared/components";
import { ApplicationModule } from "shared/modules";

import { LayoutFooterSubscription } from "./components/LayoutFooterSubscription";

import './index.scss';

export const LayoutFooter = observer(() => {
    const catalogItems = [
        {
            href: '#',
            name: 'Медикаменты'
        },
        {
            href: '#',
            name: 'Витамины и БАДы'
        },
        {
            href: '#',
            name: 'Диетическое питание, напитки'
        },
        {
            href: '#',
            name: 'Медицинская техника'
        },
        {
            href: '#',
            name: 'Медицинские товары'
        },
        {
            href: '#',
            name: 'Косметика лечебная'
        },
        {
            href: '#',
            name: 'Уход за больными'
        },
        {
            href: '#',
            name: 'Ветеринарная аптека'
        },
        {
            href: '#',
            name: 'Косметические средства'
        },
        {
            href: '#',
            name: 'Перевязочные средства'
        },
        {
            href: '#',
            name: 'Средства реабилитации'
        },
        {
            href: '#',
            name: 'Травы, чаи, бальзамы'
        },
        {
            href: '#',
            name: 'Ортопедия'
        },
        {
            href: '#',
            name: 'Репелленты'
        },
        {
            href: '#',
            name: 'Уход за больными'
        },
        {
            href: '#',
            name: 'Контроль веса'
        },
        {
            href: '#',
            name: 'Оптика'
        },
        {
            href: '#',
            name: 'Планирование семьи'
        },
        {
            href: '#',
            name: 'Товары для мамы и малыша'
        },
        {
            href: '#',
            name: 'Детское питание'
        },
        {
            href: '#',
            name: 'Средства гигиены'
        },
        {
            href: '#',
            name: 'Уход за полостью рта'
        },
        {
            href: '#',
            name: 'Прочее'
        },
    ];

    const apps = [
        {
            href: '#',
            name: 'App Store',
            img: '/assets/images/footer/app-store.png'
        },
        {
            href: '#',
            name: 'Google Play',
            img: '/assets/images/footer/google-play.png'
        },
        {
            href: '#',
            name: 'AppGallery',
            img: '/assets/images/footer/app-gallery.png'
        },
        {
            href: '#',
            name: 'RuMarket',
            img: '/assets/images/footer/ru-market.png'
        },
        {
            href: '#',
            name: 'NashMarket',
            img: '/assets/images/footer/nash-market.png'
        },
        {
            href: '#',
            name: 'Apk.file',
            img: '/assets/images/footer/apk.png'
        },
    ]

    return (
        <div className='layout-footer'>
            <UiWrap>
                {/*<LayoutFooterSubscription/>*/}
                <UiGrid
                    media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                        [MEDIA_POINTS.IS_768]: { columns: '1fr 2fr' },
                        [MEDIA_POINTS.IS_1024]: { columns: '25% 75%' },
                    }}
                    className={'layout-footer__inner'}
                >
                    <div className="layout-footer__info">
                        <div className="layout-footer-menu">
                            <div className="layout-footer-menu__name">Покупателям</div>
                            <div className="layout-footer-menu__items">
                                <UiLink
                                    className='layout-footer-menu__item'
                                    href='/contacts'
                                >
                                    Контакты
                                </UiLink>
                                <UiLink
                                    className='layout-footer-menu__item'
                                    href='/licenses'
                                >
                                    Лицензии
                                </UiLink>
                            </div>
                        </div>
                        <div className="layout-footer__contacts">
                            <UiLink
                                className='layout-footer__contact'
                                href='tel:+73822543999'
                            >
                                +7 (3822) 54-39-99
                            </UiLink>
                            <UiLink
                                className='layout-footer__contact'
                                href='mailto:info@ya-apteka.ru'
                            >
                                info@ya-apteka.ru
                            </UiLink>
                        </div>
                    </div>
                    <div className="layout-footer-menu">
                        <div className="layout-footer-menu__name">Каталог</div>
                        <div className="layout-footer-menu__items layout-footer-menu__items--catalog">
                            {catalogItems.map((item, index) => (
                                <UiLink
                                    className='layout-footer-menu__item'
                                    href={item.href}
                                >
                                    {item.name}
                                </UiLink>
                            ))}
                        </div>
                    </div>
                </UiGrid>
                <div className="layout-footer__actions">
                    <div className="layout-footer-socials">
                        <a href="#" target="_blank" className="layout-footer-socials__item">
                            <UiIcon size={40} name={'vk'} color={COLORS.PRIMARY}/>
                        </a>
                        <a href="#" target="_blank" className="layout-footer-socials__item">
                            <UiIcon size={40} name={'facebook'} color={[COLORS.PRIMARY]}/>
                        </a>
                        <a href="#" target="_blank" className="layout-footer-socials__item">
                            <UiIcon size={40} name={'instagram'} color={[COLORS.PRIMARY]}/>
                        </a>
                    </div>
                    <div className="layout-footer-download">
                        {apps.map((app) => (
                            <a href={app.href} target="_blank" className="layout-footer-download__item">
                                <img src={app.img} alt={app.name}/>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="layout-footer__warning">ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА.</div>
                <UiGrid
                    media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                        [MEDIA_POINTS.IS_768]: { columns: '300px auto', gap: 24 },
                        [MEDIA_POINTS.IS_1024]: { columns: '335px auto', gap: 24 },
                        [MEDIA_POINTS.IS_1366]: { columns: '25% 75%' },
                    }}
                    className="layout-footer-bottom"
                >
                    <div className="layout-footer__documents">
                        <UiLink
                            href={'/p/agreement'}
                            target="_blank"
                            className="layout-footer__policy"
                        >
                            Пользовательское соглашение
                        </UiLink>
                        <UiLink
                            href={'/p/privacy'}
                            target="_blank"
                            className="layout-footer__policy"
                        >
                            Политика конфиденциальности
                        </UiLink>
                        <div className="layout-footer__copyright">© {(new Date()).getFullYear()} Я+аптека</div>
                    </div>
                    <UiGrid
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                            [MEDIA_POINTS.IS_768]: { columns: 1, gap: 16 },
                            [MEDIA_POINTS.IS_1366]: { columns: '66.6% auto' },
                        }}
                    >
                        <p className="layout-footer__text">
                            Цены на сайте не являются публичной офертой. Внешний вид товара может отличаться от представленного
                            на сайте. Цены на сайте отличаются от цен в аптеках и действуют только при оформлении заказа с помощью
                            сайта.и
                        </p>
                        <a href="https://redlg.ru" target="_blank" className="layout-footer-developer">
                            <div
                                className="layout-footer-developer__icon"
                                style={{ backgroundImage: 'url("/assets/images/footer/redline.svg")' }}
                            />
                            <div className="layout-footer-developer__text">Сделано в Redline</div>
                        </a>
                    </UiGrid>
                </UiGrid>
            </UiWrap>
        </div>
    )
})

