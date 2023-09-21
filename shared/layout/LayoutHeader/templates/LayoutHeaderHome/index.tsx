'use client';

import classnames from "classnames";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

import {COLORS, ROUTES} from "shared/contants";
import {useRouter, useUser} from "shared/hooks";
import {AppService, UserService} from "shared/services";
import {UiButton, UiIcon, UiLink, UiWrap} from "shared/ui";
import {LayoutHeaderPhoneHome} from "shared/layout/LayoutHeaderPhoneHome";

import './index.scss';
import {LayoutMenu} from "shared/layout/LayoutMenu";


export const LayoutHeaderHome = observer(() => {
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
        <>
                <UiWrap className={classnames('layout-header-home', {
                    'layout-header-home--minified': AppService.headerIsMinified
                })}>

                        <UiLink href={ROUTES.HOME()} className="layout-header-home__logo"/>

                        <div className="layout-header-home__city">
                            <span>Город</span>
                        </div>
                    <UiButton
                        className={'layout-header-home__phone'}
                        colors={{
                        button: [COLORS.TRANSPARENT, COLORS.WHITE],
                        border: [COLORS.WHITE, COLORS.WHITE],
                        label: [COLORS.WHITE, COLORS.BLACK],
                        icon: [COLORS.WHITE, COLORS.BLACK],
                    }}>
                        <UiIcon
                            size={24}
                            name={ "phone"}
                        />
                        <span>+7 (383) 202-57-00</span>
                    </UiButton>

                        <div className="layout-header-home-actions">
                            <UiLink href={ROUTES.ARTICLES()} className="layout-header-home-actions__info">
                                <span>Услуги</span>
                                <UiIcon size={12} name={'arrowDown'} color={'#FFF'}/>
                            </UiLink>
                            <UiLink href={ROUTES.HOME()} className="layout-header-home-actions__info">
                                <span>Информация</span>
                                <UiIcon size={12} name={'arrowDown'} color={'#FFF'}/>
                            </UiLink>
                            {!user.isAuthorized && (

                                <UiButton
                                    onClick={() => {
                                        UserService.isAuthorized();
                                    }}
                                    className={'layout-header-login__button'}
                                    template={"icon"}
                                    colors={{
                                        button: [COLORS.TRANSPARENT, COLORS.WHITE],
                                        border: [COLORS.WHITE, COLORS.WHITE],
                                        label: [COLORS.WHITE, COLORS.BLACK],
                                    }}
                                >
                                    <span>Войти</span>
                                </UiButton>
                            )}
                            {user.isAuthorized && (
                                <>
                                    <UiButton
                                        template={'icon'}
                                        colors={{
                                            button: [COLORS.TRANSPARENT, COLORS.WHITE],
                                            border: [COLORS.WHITE, COLORS.WHITE],
                                            icon: [COLORS.WHITE, COLORS.BLACK],
                                        }}
                                    >
                                        <UiIcon size={[22,24]} name={'phone'} color={COLORS.GREEN_PRIMARY}/>
                                    </UiButton>
                                    <UiButton
                                        template={'icon'}
                                        colors={{
                                            button: [COLORS.TRANSPARENT, COLORS.WHITE],
                                            border: [COLORS.WHITE, COLORS.WHITE],
                                            icon: [COLORS.WHITE, COLORS.BLACK],
                                        }}
                                    >
                                        <UiIcon size={[22,24]} name={'heart'} color={COLORS.GREEN_PRIMARY}/>
                                    </UiButton>
                                </>
                            )}
                            <UiButton
                                template={'icon'}
                                colors={{
                                    button: [COLORS.TRANSPARENT, COLORS.WHITE],
                                    border: [COLORS.WHITE, COLORS.WHITE],
                                    icon: [COLORS.WHITE, COLORS.BLACK],
                                }}
                            >
                                <UiIcon size={24} name={'user'}/>
                            </UiButton>
                            <LayoutMenu template={'home'}/>
                        </div>
                </UiWrap>
        </>
    );
});
