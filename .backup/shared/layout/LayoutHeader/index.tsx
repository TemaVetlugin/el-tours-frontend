import React, { useEffect } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { ApplicationModule, CatalogModule, OrderModule, UserModule } from "shared/modules";
import { UiButton, UiIcon, UiLink } from "shared/uikit";
import { COLORS, ROUTES } from "shared/contants";
import { CBackCallRequestCreate } from "shared/components";
import { useIsAuthorized, useMedia, useObservable } from "shared/hooks";

import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { LayoutHeaderCatalog } from "../LayoutHeaderCatalog";
import { LayoutHeaderLocation } from "../LayoutHeaderLocation";
import { LayoutHeaderAction } from "../LayoutHeaderAction";

import './index.scss';

export const LayoutHeader = observer(() => {
    const isAuthorized = useIsAuthorized();
    const store = useObservable({
        isMinified: false,
        isOpened: false
    });

    useEffect(() => {
        const handleScroll = () => {
            const isMinified = window.scrollY > 240;
            if (isMinified !== store.isMinified) {
                store.set("isMinified", isMinified);
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, []);

    const classNames = classnames('layout-header', {
        'layout-header--minified': store.isMinified
    });

    const { is360, is768 } = useMedia();

    return (
        <>
            <div className={classNames}>
                <div className="layout-header__body">
                    <div className="layout-header-top">
                        <div className="layout-header-top__city">
                            {!(is360 || is768) && <LayoutHeaderLocation/>}
                        </div>
                        <div className="layout-header-menu">
                            {ApplicationModule.headerMenuItems.map(headerMenuItem => (
                                <UiLink
                                    key={headerMenuItem.id}
                                    href={headerMenuItem.href}
                                    className='layout-header-menu__item'
                                >
                                    {headerMenuItem.name}
                                </UiLink>
                            ))}
                        </div>
                        <div className="layout-header-top__actions">
                            <UiButton
                                href={ROUTES.PROMO_ACTIONS()}
                                isRounded
                                hasBorder={false}
                                size='small'
                                colors={{
                                    button: [COLORS.SECONDARY_GRADIENT, COLORS.SECONDARY],
                                    label: COLORS.WHITE
                                }}
                            >
                                <UiIcon size={22} name={'discountStar'} color={[COLORS.WHITE, COLORS.SECONDARY]}/>
                                <span>Акции</span>
                            </UiButton>
                        </div>
                        <div className="layout-header-top__phone">
                            <CBackCallRequestCreate/>
                        </div>
                    </div>
                    <div className="layout-header-bottom">
                        <UiLink href='/' className="layout-header__logo">
                            <img src="/assets/images/logo.svg" alt="logo"/>
                        </UiLink>
                        <div className="layout-header-bottom__catalog">
                            <UiButton
                                isRounded
                                hasBorder={false}
                                href={ROUTES.CATALOG()}
                                onClick={(e) => {
                                    e.preventDefault();
                                    store.set("isOpened", !store.isOpened);
                                }}
                                colors={{
                                    button: store.isOpened
                                        ? COLORS.PRIMARY2
                                        : [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                                    label: store.isOpened ? COLORS.PRIMARY : COLORS.WHITE
                                }}
                            >
                                {store.isOpened ? (
                                    <UiIcon size={20} name={'close'} color={COLORS.PRIMARY}/>
                                ) : (
                                    <UiIcon size={20} name={'menu'} color={COLORS.WHITE}/>
                                )}
                                <span>Каталог</span>
                            </UiButton>
                        </div>
                        <LayoutHeaderSearch/>
                        <div className="layout-header-bottom__actions">
                            <LayoutHeaderAction
                                href={ROUTES.PROFILE()}
                                label={
                                    isAuthorized
                                        ? UserModule.user.firstname || 'Профиль'
                                        : 'Войти'
                                }
                                onClick={(e) => {
                                    if (!UserModule.isAuthorized) {
                                        e.preventDefault()
                                        window.location.hash = '#login';
                                    }
                                }}
                            >
                                {(isHovered) => (
                                    <UiIcon
                                        size={26}
                                        name={'account'}
                                        color={isHovered ? COLORS.PRIMARY : COLORS.BLACK}
                                    />
                                )}
                            </LayoutHeaderAction>
                            <LayoutHeaderAction
                                label={'Избранное'}
                                href={ROUTES.FAVORITE()}
                                onClick={(e) => {
                                    if (!UserModule.isAuthorized) {
                                        e.preventDefault()
                                        window.location.hash = '#login';
                                    }
                                }}
                                alert={CatalogModule.favorite.length}
                            >
                                {(isHovered) => (
                                    <UiIcon
                                        size={26}
                                        name={'heart'}
                                        color={isHovered ? COLORS.PRIMARY : COLORS.BLACK}
                                    />
                                )}
                            </LayoutHeaderAction>
                            <LayoutHeaderAction
                                label='Корзина'
                                alert={OrderModule.cartItems.length} href={ROUTES.CART()}
                            >
                                {(isHovered) => (
                                    <UiIcon
                                        size={29}
                                        name={'cart'}
                                        color={isHovered ? COLORS.PRIMARY : COLORS.BLACK}
                                    />
                                )}
                            </LayoutHeaderAction>
                        </div>
                    </div>
                </div>
                <LayoutHeaderCatalog
                    isOpened={store.isOpened}
                    onClose={() => {
                        store.set("isOpened", false)
                    }}
                />
            </div>
            <div className="layout-header-dummy"/>
        </>
    )
})

