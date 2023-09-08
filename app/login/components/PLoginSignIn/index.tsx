'use client'

import React from "react";
import {observer} from "mobx-react-lite";

import {HomeBannerModel} from "shared/models";
import {UiButton, UiContentResource, UiForm, UiGrid, UiIcon, UiInput, UiLink, UiSlider} from "shared/ui";
import {COLORS, ROUTES} from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';
import {UserService} from "shared/services";


export const PLoginSignIn = observer(() => {
    return (
        <UiForm className="signin">
            <div className="signin__header">
                <h2>Вход</h2>
            </div>
            <div className="signin-label">
                <span>Телефон / E-mail</span>
            </div>
            <div className="signin__input">
            <UiInput
                placeholder='+7 --- --- -- --'
                name={'query'}
            />
            </div>
            <div className="signin-label">
                <span>Пароль</span>
                <UiLink>Забыли пароль?</UiLink>
            </div>
            <div className="signin__input">
            <UiInput
                placeholder='Пароль'
                type="password"
                name={'query'}
            />
            <UiButton template={'search_right'} type={'submit'} colors={{
                button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                icon: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
            }}>
                <UiIcon size={[20,20]} name={'views'}/>
            </UiButton>
            </div>
            <div className="signin__submit">
                <UiButton className="signin__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                    label: [COLORS.WHITE, COLORS.WHITE],
                }}>
                    <span>Войти</span>
                </UiButton>
            </div>
            <div className="signin-medias">
                <span>Или авторизуйтесь через социальные сети</span>
                <div className="signin-medias--wrap">
                    <UiButton
                        onClick={() => {
                        }}
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.DARK_SECONDARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={18} name={'vk'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                    <UiButton
                        onClick={() => {
                        }}
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.DARK_SECONDARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={18} name={'instagram'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                    <UiButton
                        onClick={() => {
                        }}
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.DARK_SECONDARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={18} name={'telegram'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                    <UiButton
                        onClick={() => {
                        }}
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.DARK_SECONDARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={18} name={'whatsapp'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                    <UiButton
                        onClick={() => {
                        }}
                        notification={UserService.user.userFavorites.length}
                        template={'icon'}
                        colors={{
                            button: [COLORS.WHITE, COLORS.GREEN_SECONDARY],
                            border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_SECONDARY],
                            icon: [COLORS.DARK_SECONDARY, COLORS.WHITE],
                        }}
                    >
                        <UiIcon size={18} name={'instagram'} color={COLORS.GREEN_PRIMARY}/>
                    </UiButton>
                </div>
                <div className="signin-registration">
                    <span>Нет аккаунта? <UiLink> Зарегистрироваться</UiLink></span>
                </div>
            </div>
        </UiForm>
    )
})

