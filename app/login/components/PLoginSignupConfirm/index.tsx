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


export const PLoginSignUpConfirm = observer(() => {
    return (
        <UiForm className="signup-confirm">
            <div className="signup-confirm__header">
                <h2>Регистрация</h2>
            </div>
            <span className="signup-confirm__subtitle">Напишите свой номер телефона, и мы будем вам напоминать о ближайших поездках</span>
            <div className="signup-confirm-label">
                <span>Телефон</span>
            </div>
            <div className="signup-confirm__input">
                <UiInput
                    placeholder='+7 (920) 123 45 67'
                    name={'query'}
                />
            </div>
            <div className="signup-confirm-label">
                <span>Код подтверждения</span>
                <span className="signup-confirm-label--small">Выслать повторно</span>
            </div>
            <div className="signup-confirm__input">
                <UiInput
                    placeholder='12345'
                    name={'query'}
                />
                <div className="signup-confirm-label--ufter">
                    <span>В течение 0:59 секунд придет сообщение на телефон с кодом подтверждения</span>
                </div>
            </div>
            <div className="signup-confirm__submit">
                <UiButton className="signup-confirm__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                    border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                    label: [COLORS.WHITE, COLORS.WHITE],
                }}>
                    <span>Зарегистрироваться</span>
                </UiButton>
            </div>
            <div className="signup-confirm-line">
                <div className="signup-confirm-line__step"></div>
                <div className="signup-confirm-line__step"></div>
                <div className="signup-confirm-line__step signup-confirm-line__step--active"></div>
            </div>
        </UiForm>
    )
})

