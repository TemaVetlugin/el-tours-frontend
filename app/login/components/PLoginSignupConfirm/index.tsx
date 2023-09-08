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
        <UiForm className="signup">
            <div className="signup__header">
                <h2>Регистрация</h2>
            </div>
            <span className="signup__subtitle">Укажите адрес электронной почты, на него мы будем присылать вам документы по купленным турам и авиабилетам</span>
            <div className="signup-label">
                <span>E-mail</span>
            </div>
            <div className="signup__input">
                <UiInput
                    placeholder='info@el-tours.ru'
                    name={'query'}
                />
            </div>
            <div className="signup-label">
                <span>Пароль</span>
                <span className="signup-label--small">не менее 8 символов, прописные цифры и строчные буквы</span>
            </div>
            <div className="signup__input">
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
                <div className="signup__input--unsafe"></div>
                <div className="signup-label--unsafe">
                    <span>Ненадёжный пароль</span>
                </div>
            </div>
            <div className="signup__submit">
                <UiButton className="signup__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    label: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                }}>
                    <span>Следующий шаг</span>
                </UiButton>
            </div>
            <div className="signup-signin">
                <span>Нет аккаунта? <UiLink> Зарегистрироваться</UiLink></span>
            </div>
            <div className="signup-line">
                <div className="signup-line__step"></div>
                <div className="signup-line__step"></div>
                <div className="signup-line__step signup-line__step--active"></div>
            </div>
        </UiForm>
    )
})

