'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiInput } from "shared/ui";
import { COLORS } from "shared/contants";

import './index.scss';


export const PLoginSignUpConfirm = observer(() => {
    return (
        <UiForm className="p-signup-confirm">
            <div className="p-signup-confirm__header">
                <h2>Регистрация</h2>
            </div>
            <span className="p-signup-confirm__subtitle">Напишите свой номер телефона, и мы будем вам напоминать о ближайших поездках</span>
            <div className="p-signup-confirm__label">
                <span>Телефон</span>
            </div>
            <div className="p-signup-confirm__input">
                <UiInput
                    placeholder='+7 (920) 123 45 67'
                    name={'query'}
                />
            </div>
            <div className="p-signup-confirm__label">
                <span>Код подтверждения</span>
                <span className="p-signup-confirm__label--small">Выслать повторно</span>
            </div>
            <div className="p-signup-confirm__input">
                <UiInput
                    placeholder='12345'
                    name={'query'}
                />
                <div className="p-signup-confirm__label--ufter">
                    <span>В течение 0:59 секунд придет сообщение на телефон с кодом подтверждения</span>
                </div>
            </div>
            <div className="p-signup-confirm__submit">
                <UiButton className="p-signup-confirm__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                    border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                    label: [COLORS.WHITE, COLORS.WHITE],
                }}>
                    <span>Зарегистрироваться</span>
                </UiButton>
            </div>
            <div className="p-signup-confirm-line">
                <div className="p-signup-confirm-line__step"></div>
                <div className="p-signup-confirm-line__step"></div>
                <div className="p-signup-confirm-line__step p-signup-confirm-line__step--active"></div>
            </div>
        </UiForm>
    )
})

