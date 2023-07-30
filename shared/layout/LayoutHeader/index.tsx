'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { COLORS, ROUTES } from "shared/contants";
import { useRouter } from "shared/hooks";
import { CartService, LayoutService, UserService } from "shared/services";
import { UiButton, UiIcon, UiLink, UiWrap } from "shared/ui";

import { LayoutHeaderCatalog } from "../LayoutHeaderCatalog";
import { LayoutHeaderLocation } from "../LayoutHeaderLocation";
import { LayoutHeaderLogin } from "../LayoutHeaderLogin";
import { LayoutHeaderMenuPrimary } from "../LayoutHeaderMenuPrimary";
import { LayoutHeaderMenuSecondary } from "../LayoutHeaderMenuSecondary";
import { LayoutHeaderPromo } from "../LayoutHeaderPromo";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";

import './index.scss';

export const LayoutHeader = observer(() => {
    const router = useRouter();
    useEffect(() => {
        const handleMinified = () => {
            const isMinified = window.scrollY > 20;
            if (LayoutService.headerIsMinified !== isMinified) {
                LayoutService.set("headerIsMinified", isMinified);
            }
        }
        handleMinified();
        window.addEventListener('scroll', handleMinified);

        return () => window.removeEventListener('scroll', handleMinified)
    }, []);
    return (
        <>
            <div className={classnames('layout-header layout-header--dummy')}/>
            <div className={classnames('layout-header layout-header--fixed', {
                'layout-header--minified': LayoutService.headerIsMinified
            })}>
                <UiWrap>
                    <div className="layout-header__top">
                        <LayoutHeaderLocation/>
                        <LayoutHeaderMenuPrimary/>
                        <LayoutHeaderMenuSecondary/>
                    </div>
                </UiWrap>
                <UiWrap>
                    <div className="layout-header__main">
                        <UiLink href={ROUTES.HOME()} className="layout-header__logo"/>
                        <div className="layout-header__catalog">
                            <LayoutHeaderCatalog/>
                        </div>
                        <LayoutHeaderSearch/>
                        <div className="layout-header__actions">
                            <LayoutHeaderLogin/>
                            <UiButton
                                onClick={() => {
                                    if (!UserService.isAuthorized()) {
                                        return;
                                    }
                                    router.push(ROUTES.FAVORITES())
                                }}
                                notification={UserService.user.userFavorites.length}
                                size={'icon'}
                                colors={{
                                    button: [COLORS.LIGHT_BLUE, COLORS.GREEN_PRIMARY],
                                    icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={24} name={'heart'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <UiLink href={ROUTES.CART().url}>
                                <UiButton
                                    size={'icon'}
                                    notification={CartService.cartItems.length}
                                    colors={{
                                        button: [COLORS.LIGHT_BLUE, COLORS.GREEN_PRIMARY],
                                        icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                                    }}
                                >
                                    <UiIcon size={24} name={'cart'} color={COLORS.GREEN_PRIMARY}/>
                                </UiButton>
                            </UiLink>
                        </div>
                    </div>
                </UiWrap>
                <LayoutHeaderPromo/>
            </div>
        </>
    );
});
