'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiForm, UiInput } from "shared/ui";
import { COLORS } from "shared/contants";

import './index.scss';


export const PLoginSignUpPhone = observer(() => {
    return (
        <UiForm className="p-signup-phone">
            <div className="p-signup-phone__header">
                <h2>Регистрация</h2>
            </div>
            <span className="p-signup-phone__subtitle">Напишите свой номер телефона, и мы будем вам напоминать о ближайших поездках</span>
            <div className="p-signup-phone__label">
                <span>Телефон</span>
            </div>
            <div className="p-signup-phone__input">
                <UiInput
                    placeholder='+7 --- --- -- --'
                    name={'query'}
                />
            </div>
            <div className="p-signup-phone__submit">
                <UiButton className="p-signup-phone__submit" template={'normal'} type={'submit'} colors={{
                    button: [COLORS.WHITE, COLORS.WHITE],
                    border: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                    label: [COLORS.DARK_SECONDARY_BORDER, COLORS.DARK_SECONDARY_BORDER],
                }}>
                    <span>Выслать код подтверждения</span>
                </UiButton>
            </div>
            <div className="p-signup-phone-line">
                <div className="p-signup-phone-line__step"></div>
                <div className="p-signup-phone-line__step"></div>
                <div className="p-signup-phone-line__step p-signup-phone-line__step--active"></div>
            </div>
        </UiForm>
    )
})

