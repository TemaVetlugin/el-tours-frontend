'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { UiButton, UiCheckbox, UiForm, UiFormControl, UiIcon, UiInput, UiModal } from "shared/ui";
import { COLORS, MASKS, ROUTES } from "shared/contants";
import { LayoutService, UserService } from "shared/services";
import { useMask, useNavigate, useObservable, useUser } from "shared/hooks";
import { isMobilePhone, isRequired } from "shared/validations";
import { useValidation } from "shared/hooks/useValidation";
import { usersConfirm, usersLogin } from "shared/queries/main";

import './index.scss';

export const LayoutHeaderLogin = observer(() => {
    const user = useUser();
    const navigate = useNavigate();
    const store = useObservable({
        errorMessage: '',
        isAccepted: 1,
        isLoading: false,
        step: 'login',
        phone: '',
        code: '',
    });

    const validationLogin = useValidation(store, {
        phone: [isRequired(), isMobilePhone()],
    });

    const handleLogin = async () => {
        validationLogin.submit();
        if (!validationLogin.isValid) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess } = await usersLogin({
            phone: store.phone
        });

        if (isSuccess) {
            store.set("step", 'confirm');
        }
        store.set("isLoading", false);
    }

    const handleConfirm = async () => {
        store.set("isLoading", true);
        const { isSuccess, data, description } = await usersConfirm({
            phone: store.phone,
            code: store.code
        });

        if (isSuccess && data) {
            await UserService.boot(data.accessToken);
            store.set("isLoading", false);
            LayoutService.set('loginIsOpened', false)
            store.set("step", 'login');
        }

        if (!isSuccess && description) {
            store.set('errorMessage', description);
        }

        store.set("isLoading", false);
    }

    return (
        <div className='layout-header-login'>
            <UiButton
                style={{ minWidth: 116 }}
                isLoading={UserService.isLoading}
                onClick={() => {
                    if (!UserService.requireAuthorization()) {
                        return;
                    }
                    navigate(ROUTES.PROFILE());
                }}
                colors={{
                    button: [COLORS.LIGHT_BLUE, COLORS.GREEN_SECONDARY],
                    label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                    icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                }}
            >
                <UiIcon size={24} name={'user'}/>
                <span>{user.isAuthorized ? useMask(MASKS.MOBILE_PHONE, user.phone) : 'Войти'}</span>
            </UiButton>
            <UiModal
                width={435}
                isOpened={LayoutService.loginIsOpened}
                onOpen={() => {
                    store.set('step', 'login');
                }}
                onClose={() => LayoutService.set("loginIsOpened", false)}
            >
                {store.step === 'login' && (
                    <>
                        <UiModal.Title>Вход в личный кабинет</UiModal.Title>
                        <UiModal.Description>Пожалуйста авторизуйтесь, чтобы оформить заказ</UiModal.Description>
                        <UiForm onSubmit={handleLogin}>
                            <UiFormControl
                                label={'Введите номер телефона'}
                                errorMessage={validationLogin.phone.errorMessage}
                            >
                                <UiInput
                                    mask={MASKS.MOBILE_PHONE}
                                    placeholder={'Введите ваш номер телефона'}
                                    name={'phone'}
                                    value={store.phone}
                                    onChange={store.handleChange}
                                    autoFocus
                                />
                            </UiFormControl>
                            <UiFormControl
                                errorMessage={store.errorMessage}
                            >
                                <UiButton
                                    isLoading={store.isLoading}
                                    type={'submit'}
                                    label={'Продолжить'}
                                />
                            </UiFormControl>
                            <UiCheckbox
                                isRequired
                                name={'isAccepted'}
                                value={store.isAccepted}
                                onChange={store.handleChange}
                            >
                                Ознакомлен и согласен с условиями <Link href={'#'}>Пользовательского
                                соглашения</Link> и <Link href={'#'}>Политики конфиденциальности</Link>
                            </UiCheckbox>
                        </UiForm>
                    </>
                )}
                {store.step === 'confirm' && (
                    <>
                        <UiModal.Title>Вход в личный кабинет</UiModal.Title>
                        <UiModal.Description>Пожалуйста авторизуйтесь, чтобы оформить заказ</UiModal.Description>
                        <UiForm onSubmit={handleConfirm}>
                            <input
                                value={store.code}
                                onChange={(e) => {
                                    store.set("code", e.target.value || '');
                                }}
                            />
                            <UiFormControl
                                errorMessage={store.errorMessage}
                            >
                                <UiButton
                                    isDisabled={!store.code || store.code.length < 4}
                                    isLoading={store.isLoading}
                                    type={'submit'}
                                    label={'Продолжить'}
                                />
                            </UiFormControl>
                        </UiForm>
                    </>
                )}
            </UiModal>
        </div>
    );
});
