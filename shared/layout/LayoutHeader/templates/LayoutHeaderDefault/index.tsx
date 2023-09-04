'use client';

import classnames from "classnames";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

import {COLORS, ROUTES} from "shared/contants";
import {useRouter} from "shared/hooks";
import {LayoutService, UserService} from "shared/services";
import {UiButton, UiIcon, UiLink, UiWrap} from "shared/ui";

import {LayoutHeaderPhone} from "../../../LayoutHeaderPhone";
import {LayoutHeaderLogin} from "../../../LayoutHeaderLogin";

import './index.scss';
import {LayoutMenu} from "shared/layout/LayoutMenu";

type PropsType = {
    children?: React.ReactNode,
}
export const LayoutHeaderDefault = observer(({children} : PropsType) => {
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
            <div className={classnames('layout-header-default layout-header-default--dummy')}/>
            <div className={classnames('layout-header-default layout-header-default--fixed', {
                'layout-header-default--minified': LayoutService.headerIsMinified
            })}>
                <UiWrap>
                    <div className="layout-header-default__main">
                        <UiLink href={ROUTES.HOME()} className="layout-header-default__logo"/>
                        {/*<div className="layout-header-default__catalog">*/}
                        {/*    <LayoutHeaderCatalog/>*/}
                        {/*</div>*/}
                        {children}
                        <LayoutHeaderPhone/>

                        <div className="layout-header-default__actions">
                            <UiLink href={ROUTES.ARTICLES()} className="layout-header-default__info">
                                <span>Услуги</span>
                                <UiIcon size={12} name={'arrowDown'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header-default__info">
                                <span>Информация</span>
                                <UiIcon size={12} name={'arrowDown'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header-default__currency">
                                <img src={require('../../../../../public/assets/images/rubl.png').default.src} className="layout-header-default__currency" alt=""/>
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
                                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.WHITE],
                                    icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={[22,24]} name={'heart'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <LayoutHeaderLogin/>

                            <LayoutMenu/>
                        </div>
                    </div>
                </UiWrap>
            </div>
        </>
    );
});
