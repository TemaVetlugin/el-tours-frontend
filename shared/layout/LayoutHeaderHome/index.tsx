'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { COLORS, ROUTES } from "shared/contants";
import { useRouter } from "shared/hooks";
import { LayoutService, UserService } from "shared/services";
import { UiButton, UiIcon, UiLink, UiWrap } from "shared/ui";

import { LayoutHeaderPhone} from "../LayoutHeaderPhone";
import { LayoutHeaderLocation } from "../LayoutHeaderLocation";
import { LayoutHeaderLogin } from "../LayoutHeaderLogin";
import { LayoutHeaderMenuPrimary } from "../LayoutHeaderMenuPrimary";
import { LayoutHeaderPromo } from "../LayoutHeaderPromo";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";

import './index.scss';
import {LayoutHeaderPhoneHome} from "shared/layout/LayoutHeaderPhoneHome";


export const LayoutHeaderHome = observer(() => {
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
            <div className={classnames('layout-header-home layout-header-home--dummy')}/>
            <div className={classnames('layout-header-home layout-header-home--fixed', {
                'layout-header-home--minified': LayoutService.headerIsMinified
            })}>
                <UiWrap>
                    <div className="layout-header-home__main">
                        <UiLink href={ROUTES.HOME()} className="layout-header-home__logo"/>
                        {/*<div className="layout-header-home__catalog">*/}
                        {/*    <LayoutHeaderCatalog/>*/}
                        {/*</div>*/}
                        <div className="layout-header-home__city">
                            <p>Город</p>
                        </div>
                        <LayoutHeaderPhoneHome/>

                        <div className="layout-header-home__actions">
                            <UiLink href={ROUTES.BLOG()} className="layout-header-home__info">
                                <span>Услуги</span>
                                <UiIcon size={12} name={'arrow_down'} color={'#FFF'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header-home__info">
                                <span>Информация</span>
                                <UiIcon size={12} name={'arrow_down'} color={'#FFF'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header-home__currency">
                                <img src={require('../../../public/assets/images/rubl.png').default.src} className="layout-header-home__currency" alt=""/>
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
                                    button: [COLORS.TRANSPARENT, COLORS.WHITE],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.BLACK],
                                }}
                            >
                                <UiIcon size={24} name={'heart'}/>
                            </UiButton>
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
                                    button: [COLORS.TRANSPARENT, COLORS.WHITE],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.BLACK],
                                }}
                            >
                                <UiIcon size={24} name={'user'}/>
                            </UiButton>
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
                                    button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                    border: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                    icon: [COLORS.WHITE, COLORS.WHITE],

                                }}
                            >
                                <UiIcon size={[22, 20]} name={'burger'}/>
                            </UiButton>
                        </div>
                    </div>
                </UiWrap>
            </div>
        </>
    );
});
