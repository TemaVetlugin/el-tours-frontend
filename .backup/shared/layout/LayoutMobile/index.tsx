import React from "react";
import { observer } from "mobx-react";

import { UiButton, UiIcon, UiLink } from "shared/uikit";
import { COLORS, ROUTES } from "shared/contants";
import { useIsAuthorized, useObservable } from "shared/hooks";
import { CatalogModule, OrderModule, UserModule } from "shared/modules";

import { LayoutHeaderCatalog } from "../LayoutHeaderCatalog";
import { LayoutHeaderLocation } from "../LayoutHeaderLocation";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { LayoutHeaderAction } from "../LayoutHeaderAction";

import './index.scss';

export const LayoutMobile = observer(() => {
    const isAuthorized = useIsAuthorized();
    const store = useObservable({
        isOpenedCatalog: false,
        isOpenedSearch: false
    });

    return (
        <>
            <div className='layout-mobile-header'>
                <div className="layout-mobile-header__inner">
                    <div className="layout-mobile-header__left">
                        <LayoutHeaderLocation/>
                        <UiButton
                            isRounded
                            hasBorder={false}
                            href={ROUTES.CATALOG()}
                            onClick={(e) => {
                                e.preventDefault();
                                store.set("isOpenedCatalog", !store.isOpenedCatalog);
                            }}
                            colors={{
                                button: store.isOpenedCatalog
                                    ? COLORS.PRIMARY2
                                    : [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                            }}
                        >
                            {store.isOpenedCatalog ? (
                                <UiIcon size={20} name={'close'} color={COLORS.PRIMARY}/>
                            ) : (
                                <UiIcon size={20} name={'menu'} color={COLORS.WHITE}/>
                            )}
                        </UiButton>
                    </div>
                    <UiLink href={ROUTES.HOME()} className="layout-mobile-header__logo">
                        <img src="/assets/images/logo.svg" alt="logo"/>
                    </UiLink>
                    <UiButton
                        isRounded
                        onClick={(e) => {
                            e.preventDefault();
                            store.set("isOpenedSearch", !store.isOpenedSearch);
                        }}
                        style={{zIndex: 10}}
                        colors={store.isOpenedSearch ? {
                            button: COLORS.WHITE,
                            border: COLORS.PRIMARY,
                        } : {
                            button: COLORS.WHITE,
                            border: COLORS.GRAY_BORDER,
                        }}
                    >
                        <UiIcon size={20} name={store.isOpenedSearch ? 'close' : 'search'} color={COLORS.GRAY_ICON}/>
                    </UiButton>
                    {store.isOpenedSearch && (
                        <div className="layout-mobile-header__search">
                            <LayoutHeaderSearch autoFocus/>
                        </div>
                    )}
                </div>
                <LayoutHeaderCatalog
                    isOpened={store.isOpenedCatalog}
                    onClose={() => store.set("isOpenedCatalog", false)}
                />
            </div>
            <div className="layout-mobile-footer">
                <LayoutHeaderAction
                    href={ROUTES.CATALOG()}
                    label={'Каталог'}
                >
                    {(isHovered) => (
                        <UiIcon
                            size={26}
                            name={'menu'}
                            color={isHovered ? COLORS.PRIMARY : COLORS.BLACK}
                        />
                    )}
                </LayoutHeaderAction>
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
        </>
    )
})

