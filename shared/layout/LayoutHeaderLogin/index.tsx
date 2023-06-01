'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { UiButton, UiForm, UiFormControl, UiIcon, UiInput, UiModal, UiCheckbox } from "shared/ui";
import { COLORS, MASKS } from "shared/contants";
import { LayoutService } from "shared/services";
import { useObservable } from "shared/hooks";

import './index.scss';

export const LayoutHeaderLogin = observer(() => {
    const store = useObservable({
        phone: '',
        isAccepted: 1
    })
    return (
        <div className='layout-header-login'>
            <UiButton
                onClick={() => LayoutService.set('loginIsOpened', true)}
                colors={{
                    button: [COLORS.LIGHT_BLUE, COLORS.GREEN_SECONDARY],
                    label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                    icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                }}
            >
                <UiIcon size={24} name={'user'}/>
                <span>Войти</span>
            </UiButton>
            <UiModal
                width={435}
                isOpened={LayoutService.loginIsOpened}
                onClose={() => LayoutService.set("loginIsOpened", false)}
            >
                <div className="layout-header-login__modal">
                    <UiModal.Title>Вход в личный кабинет</UiModal.Title>
                    <UiModal.Description>Пожалуйста авторизуйтесь, чтобы оформить заказ</UiModal.Description>
                    <UiForm>
                        <UiFormControl label={'Введите номер телефона'}>
                            <UiInput
                                mask={MASKS.MOBILE_PHONE}
                                placeholder={'Введите ваш номер телефона'}
                                name={'phone'}
                                value={store.phone}
                                onChange={store.handleChange}
                            />
                        </UiFormControl>
                        <UiButton
                            label={'Продолжить'}
                        />
                        <UiCheckbox name={'isAccepted'} value={store.isAccepted} onChange={store.handleChange}>
                            Ознакомлен и согласен с условиями <Link href={'#'}>Пользовательского
                            соглашения</Link> и <Link href={'#'}>Политики конфиденциальности</Link>
                        </UiCheckbox>
                    </UiForm>
                </div>
            </UiModal>
        </div>
    );
});
