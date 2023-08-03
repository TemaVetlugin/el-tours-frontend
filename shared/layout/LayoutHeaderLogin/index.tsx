'use client';

import { observer } from "mobx-react-lite";
import Link from "next/link";
import React from "react";
import { COLORS, MASKS, ROUTES } from "shared/contants";
import { useMask, useObservable, useRouter, useUser } from "shared/hooks";
import { useValidation } from "shared/hooks/useValidation";
import { usersConfirmQuery, usersLoginQuery } from "shared/queries/main";
import { LayoutService, UserService } from "shared/services";

import { UiButton, UiCheckbox, UiForm, UiFormControl, UiIcon, UiInput, UiModal } from "shared/ui";
import { isMobilePhone, isRequired } from "shared/validations";

import './index.scss';

export const LayoutHeaderLogin = observer(() => {
    const user = useUser();
    const router = useRouter();
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
        const { isSuccess } = await usersLoginQuery({
            phone: store.phone
        });

        if (isSuccess) {
            store.set("step", 'confirm');
        }
        store.set("isLoading", false);
    }

    const handleConfirm = async () => {
        store.set("isLoading", true);
        const { isSuccess, data, description } = await usersConfirmQuery({
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
            {user.isAuthorized && (
                <UiButton
                    style={{ minWidth: 116 }}
                    isLoading={UserService.isLoading}
                    onClick={() => {
                        console.log(123, ROUTES.PROFILE())
                        router.push(ROUTES.PROFILE());
                    }}
                    colors={{
                        button: [COLORS.LIGHT_BLUE, COLORS.GREEN_SECONDARY],
                        label: [COLORS.TYPO, COLORS.WHITE],
                        icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={24} name={'user'}/>
                    <span>
                    {useMask('+{7} *** 00-00', user.phone.replace(user.phone.substring(1,7), '***'))}
                </span>
                </UiButton>
            )}
            {!user.isAuthorized && (
                <UiButton
                    style={{ minWidth: 116 }}
                    isLoading={UserService.isLoading}
                    onClick={() => {
                        UserService.isAuthorized();
                    }}
                    colors={{
                        button: [COLORS.LIGHT_BLUE, COLORS.GREEN_SECONDARY],
                        label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                        icon: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={24} name={'user'}/>
                    <span>Войти</span>
                </UiButton>
            )}

            <UiModal
                width={435}
                isOpened={LayoutService.loginIsOpened}
                onOpen={() => {
                    store.set("errorMessage", '');
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
                            <UiFormControl>
                                <UiInput
                                    placeholder={'Введите код'}
                                    name={'code'}
                                    value={store.code}
                                    onChange={store.handleChange}
                                    autoFocus
                                />
                            </UiFormControl>
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
