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


export const PLoginSignUpEmail = observer(() => {
    return (
        <UiForm className="signup-email">
            <div className="signup-email__header">
                <h2>Регистрация</h2>
            </div>
            <span className="signup-email__subtitle">Укажите адрес электронной почты, на него мы будем присылать вам документы по купленным турам и авиабилетам</span>
            <div className="signup-email-label">
                <span>E-mail</span>
            </div>
            <div className="signup-email__input">
                <UiInput
                    placeholder='info@el-tours.ru'
                    name={'query'}
                />
            </div>
            <div className="signup-email-label">
                <span>Пароль</span>
                <span className="signup-email-label--small">не менее 8 символов, прописные цифры и строчные буквы</span>
            </div>
            <div className="signup-email__input">
                <UiInput
                    placeholder='Пароль'
                    type="password"
                    name={'query'}
                />

                <UiButton template={'search_right'} type={'submit'} colors={{
                    button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                    icon: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                }}>
                    <UiIcon size={[20, 20]} name={'views'}/>
                </UiButton>
                <div className="signup-email__input--unsafe"></div>
                <div className="signup-email-label--unsafe">
                    <span>Ненадёжный пароль</span>
                </div>
            </div>
            <div className="signup-email__submit">
                <UiButton className="signup-email__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    label: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                }}>
                    <span>Следующий шаг</span>
                </UiButton>
            </div>
            <div className="signup-email-signin">
                <span>Есть аккаунт? <UiLink> Войти</UiLink></span>
            </div>
            <div className="signup-email-line">
                <div className="signup-email-line__step"></div>
                <div className="signup-email-line__step"></div>
                <div className="signup-email-line__step signup-email-line__step--active"></div>
            </div>
        </UiForm>
    )
})

