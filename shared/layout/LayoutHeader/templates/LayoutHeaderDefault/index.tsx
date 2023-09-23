'use client';

import classnames from "classnames";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

import {COLORS, ROUTES} from "shared/contants";
import {useRouter, useUser} from "shared/hooks";
import {AppService, UserService} from "shared/services";
import {UiButton, UiIcon, UiLink, UiWrap} from "shared/ui";
import {LayoutHeaderPhone} from "../../../LayoutHeaderPhone";
import {LayoutHeaderLogin} from "../../../LayoutHeaderLogin";
import {LayoutMenu} from "shared/layout/LayoutMenu";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
}
export const LayoutHeaderDefault = observer(({children}: PropsType) => {
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        const handleMinified = () => {
            const isMinified = window.scrollY > 20;
            if (AppService.headerIsMinified !== isMinified) {
                AppService.set("headerIsMinified", isMinified);
            }
        }
        handleMinified();
        window.addEventListener('scroll', handleMinified);

        return () => window.removeEventListener('scroll', handleMinified)
    }, []);
    return (
        <div className={'layout-header-default'}>
            <UiWrap className={classnames('layout-header-default--wrap', {
                'layout-header-default--minified': AppService.headerIsMinified
            })}>
                <UiLink href={ROUTES.HOME()} className="layout-header-default__logo"/>
                {children}
                <UiButton
                    className={'layout-header-default__phone'}
                    colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                    label: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                    icon: [COLORS.DARK_PRIMARY, COLORS.DARK_PRIMARY],
                }}>
                    <UiIcon
                        size={24}
                        name={"phone"}
                    />
                    <span>+7 (383) 202-57-00</span>
                </UiButton>

                <div className="layout-header-default-actions">
                    <UiLink href={ROUTES.ARTICLES()} className="layout-header-default-actions__info">
                        <span>Услуги</span>
                        <UiIcon size={12} name={'arrowDown'}/>
                    </UiLink>
                    <UiLink href={ROUTES.HOME()} className="layout-header-default-actions__info">
                        <span>Информация</span>
                        <UiIcon size={12} name={'arrowDown'}/>
                    </UiLink>

                    {!user.isAuthorized && (
                        <LayoutHeaderLogin/>
                    )}
                    <UiButton
                        template={'icon'}
                        onClick={() => {
                            UserService.isAuthorized();
                        }}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.WHITE],
                            icon: [COLORS.BLACK, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={[20, 24]} name={'user'}/>
                    </UiButton>
                    <UiButton
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.WHITE],
                            icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                        }}
                    >

                        <UiIcon size={[22, 24]} name={'search'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                    {user.isAuthorized && (
                        <>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.WHITE],
                                    icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={[22, 24]} name={'phone'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.WHITE],
                                    icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                                }}
                            >
                                <UiIcon size={[22, 24]} name={'heart'} color={COLORS.GREEN_PRIMARY}/>
                            </UiButton>
                        </>
                    )}

                    <LayoutMenu/>
                </div>
            </UiWrap>
        </div>
    );
});
