'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiIcon, UiLink } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { useNavigate } from "shared/hooks";

import './index.scss';

export const CProfileMenu = observer(() => {
    const navigate = useNavigate();
    return (
        <div className="c-profile-menu">
            <UiLink href={ROUTES.PROFILE().url} className={'c-profile-menu-item'}>
                <UiIcon size={16} name={'user'}/>
                <span>{ROUTES.PROFILE().name}</span>
            </UiLink>
            <UiLink href={ROUTES.PROFILE_ORDERS().url} className={'c-profile-menu-item'}>
                <UiIcon size={16} name={'orders'}/>
                <span>{ROUTES.PROFILE_ORDERS().name}</span>
            </UiLink>
            <UiLink href={ROUTES.PROFILE_PREORDERS().url} className={'c-profile-menu-item'}>
                <UiIcon size={16} name={'calendar'}/>
                <span>{ROUTES.PROFILE_PREORDERS().name}</span>
            </UiLink>
            <UiLink href={ROUTES.FAVORITES().url} className={'c-profile-menu-item'}>
                <UiIcon size={16} name={'heart'}/>
                <span>{ROUTES.FAVORITES().name}</span>
                {UserService.user.userFavorites.length > 0 && (
                    <i>{UserService.user.userFavorites.length}</i>
                )}
            </UiLink>
            <UiLink href={ROUTES.PROFILE_REMINDERS().url} className={'c-profile-menu-item'}>
                <UiIcon size={16} name={'alarm'}/>
                <span>{ROUTES.PROFILE_REMINDERS().name}</span>
            </UiLink>
            <UiLink href={ROUTES.CART().url} className={'c-profile-menu-item'}>
                <UiIcon size={16} name={'cart'}/>
                <span>{ROUTES.CART().name}</span>
                {CartService.quantity > 0 && (
                    <i>{CartService.quantity}</i>
                )}
            </UiLink>
            <div className="c-profile-menu__logout" onClick={() => {
                UserService.logout();
                navigate(ROUTES.HOME());
            }}>
                <span>Выйти</span>
                <UiIcon size={24} name={'logout'}/>
            </div>
        </div>
    )
})
