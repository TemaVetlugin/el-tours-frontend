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


export const PLoginSignUpPhone = observer(() => {
    return (
        <UiForm className="signup-phone">
            <div className="signup-phone__header">
                <h2>Регистрация</h2>
            </div>
            <span className="signup-phone__subtitle">Напишите свой номер телефона, и мы будем вам напоминать о ближайших поездках</span>
            <div className="signup-phone-label">
                <span>Телефон</span>
            </div>
            <div className="signup-phone__input">
                <UiInput
                    placeholder='+7 --- --- -- --'
                    name={'query'}
                />
            </div>
            <div className="signup-phone__submit">
                <UiButton className="signup-phone__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    label: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                }}>
                    <span>Выслать код подтверждения</span>
                </UiButton>
            </div>
            <div className="signup-phone-line">
                <div className="signup-phone-line__step"></div>
                <div className="signup-phone-line__step"></div>
                <div className="signup-phone-line__step signup-phone-line__step--active"></div>
            </div>
        </UiForm>
    )
})

