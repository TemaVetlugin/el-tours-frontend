'use client';

import React from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";

import { UiButton, UiIcon, UiLink, UiWrap } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { useNavigate } from "shared/hooks";

import { LayoutHeaderLocation } from "../LayoutHeaderLocation";
import { LayoutHeaderMenuPrimary } from "../LayoutHeaderMenuPrimary";
import { LayoutHeaderMenuSecondary } from "../LayoutHeaderMenuSecondary";
import { LayoutHeaderCatalog } from "../LayoutHeaderCatalog";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { LayoutHeaderLogin } from "../LayoutHeaderLogin";
import { LayoutHeaderPromo } from "../LayoutHeaderPromo";

import './index.scss';

export const LayoutHeader = observer(() => {
    const navigate = useNavigate();
    return (
        <div className='layout-header'>
            <UiWrap>
                <div className="layout-header__top">
                    <LayoutHeaderLocation/>
                    <LayoutHeaderMenuPrimary/>
                    <LayoutHeaderMenuSecondary/>
                </div>
            </UiWrap>
            <UiWrap>
                <div className="layout-header__main">
                    <Link href={ROUTES.HOME().url} className="layout-header__logo"/>
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
                                navigate(ROUTES.FAVORITES())
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
    );
});
