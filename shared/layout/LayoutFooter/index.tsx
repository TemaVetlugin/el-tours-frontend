import React from "react";
import { observer } from "mobx-react";

import { COLORS, ROUTES } from "shared/contants";

import { UiIcon, UiLink, UiWrap } from "shared/uikit";
import { CBackCallRequestCreate } from "shared/components";
import { ApplicationModule } from "shared/modules";

import { LayoutFooterSubscription } from "./components/LayoutFooterSubscription";

import './index.scss';

export const LayoutFooter = observer(() => {
    return (
        <div className='layout-footer'>
            <UiWrap>
                <LayoutFooterSubscription/>
                <div className="layout-footer__inner">
                    <UiLink href={ROUTES.HOME()} className="layout-footer__logo">
                        <img src="/assets/images/logo.svg" alt="logo"/>
                    </UiLink>
                    <div className="layout-footer-menus">
                        {ApplicationModule.footerMenuItems.map(footerMenuItem => (
                            <div key={footerMenuItem.id} className="layout-footer-menu">
                                <UiLink
                                    href={footerMenuItem.href}
                                    className="layout-footer-menu__name"
                                >
                                    {footerMenuItem.name}
                                </UiLink>
                                <div className="layout-footer-menu__items">
                                    {footerMenuItem?.items?.map((item, index) => (
                                        <UiLink
                                            className='layout-footer-menu__item'
                                            key={index}
                                            href={item.href}
                                        >
                                            {item.name}
                                        </UiLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="layout-footer__info">
                        <CBackCallRequestCreate/>
                    </div>
                </div>
                <div className="layout-footer-bottom">
                    <UiLink
                        href={'/p/privacy'}
                        target="_blank"
                        className="layout-footer__policy"
                    >
                        Политика конфиденциальности
                    </UiLink>
                    <a href="https://redlg.ru" target="_blank" className="layout-footer-developer">
                        <div
                            className="layout-footer-developer__icon"
                            style={{ backgroundImage: 'url("/assets/images/footer/redline.svg")' }}
                        />
                        <div className="layout-footer-developer__text">Сделано в Redline</div>
                    </a>
                    <div className="layout-footer-socials">
                        <a href="#" target="_blank" className="layout-footer-socials__item">
                            <UiIcon size={18} name={'odnoklassniki'} color={[COLORS.GRAY_SOCIALS, '#DADADA']}/>
                        </a>
                        <a href="#" target="_blank" className="layout-footer-socials__item">
                            <UiIcon size={20} name={'vk'} color={COLORS.GRAY_SOCIALS}/>
                        </a>
                    </div>
                    <div className="layout-footer__copyright">{(new Date()).getFullYear()} © Аптека Добротека</div>
                </div>
            </UiWrap>
        </div>
    )
})

