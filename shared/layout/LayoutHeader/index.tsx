'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { COLORS, ROUTES } from "shared/contants";
import { useRouter } from "shared/hooks";
import { CartService, LayoutService, UserService } from "shared/services";
import { UiButton, UiIcon, UiLink, UiWrap } from "shared/ui";

import { LayoutHeaderPhone} from "../LayoutHeaderPhone";
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
                    <div className="layout-header__main">
                        <UiLink href={ROUTES.HOME()} className="layout-header__logo"/>
                        {/*<div className="layout-header__catalog">*/}
                        {/*    <LayoutHeaderCatalog/>*/}
                        {/*</div>*/}
                        <LayoutHeaderSearch/>
                        <LayoutHeaderPhone/>

                        <div className="layout-header__actions">
                            <UiLink href={ROUTES.HOME()} className="layout-header__info">
                                <span>Услуги</span>
                                <UiIcon size={12} name={'arrow_down'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header__info">
                                <span>Информация</span>
                                <UiIcon size={12} name={'arrow_down'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header__currency">
                                <img src={require('../../../public/assets/images/rubl.png').default.src} className="layout-header__currency" alt=""/>
                                <span>Ru,   ₽</span>
                            </UiLink>
                            <UiButton
                                onClick={() => {
                                    if (!UserService.isAuthorized()) {
                                        return;
                                    }
                                    router.push(ROUTES.FAVORITES())
                                }}
                                notification={UserService.user.userFavorites.length}
                                template={'icon'}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                                    border: [COLORS.DARK_SECONDARY, COLORS.WHITE],
                                    icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={24} name={'heart'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <LayoutHeaderLogin/>
                            <UiButton
                                onClick={() => {
                                    if (!UserService.isAuthorized()) {
                                        return;
                                    }
                                    router.push(ROUTES.FAVORITES())
                                }}
                                notification={UserService.user.userFavorites.length}
                                template={'icon'}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.WHITE],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],

                                }}
                            >
                                <UiIcon size={24} name={'burger'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                        </div>
                    </div>
                </UiWrap>
            </div>
        </>
    );
});
