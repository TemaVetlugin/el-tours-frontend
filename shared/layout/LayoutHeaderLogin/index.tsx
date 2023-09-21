'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React from "react";
import { COLORS, MASKS, ROUTES } from "shared/contants";
import { useMask, useRouter, useStore, useUser } from "shared/hooks";
import { useValidation } from "shared/hooks/useValidation";
import { usersConfirmQuery, usersLoginQuery } from "shared/queries/main";
import { AppService, UserService } from "shared/services";

import { UiButton, UiCheckbox, UiForm, UiIcon, UiInput, UiModal } from "shared/ui";
import { isMobilePhone, isRequired } from "shared/validations";

import './index.scss';


type PropsType = {
    template?: 'home'|'default'
}

export const LayoutHeaderLogin = observer(() => {
    const user = useUser();
    const router = useRouter();
    const store = useStore({
        errorMessage: '',
        isAccepted: 1,
        isLoading: false,
        step: 'confirm',
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
            AppService.set('loginIsOpened', false)
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
                    isLoading={UserService.isLoading}
                    onClick={() => {
                        router.push(ROUTES.PROFILE());
                    }}
                    template={"icon"}
                    colors={{
                        button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.GREEN_PRIMARY],
                        icon: [COLORS.BLACK, COLORS.WHITE],
                    }}
                >
                    <UiIcon size={24} name={'user'}/>
                    <span>
                    {useMask('+{7} *** 00-00', user.phone.replace(user.phone.substring(1, 7), '***'))}
                </span>
                </UiButton>
            )}
            {!user.isAuthorized && (
                <UiButton
                    style={{ width: 50 }}
                    isLoading={UserService.isLoading}
                    onClick={() => {
                        UserService.isAuthorized();
                    }}
                    className={'layout-header-login__button'}
                    template={"icon"}
                    colors={{
                        button: [COLORS.WHITE, COLORS.GREEN_PRIMARY],
                        border: [COLORS.DARK_SECONDARY_BORDER, COLORS.WHITE],
                        label: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                    }}
                >
                    <span>Войти</span>
                </UiButton>
            )}

            <UiModal
                width={435}
                isOpened={AppService.loginIsOpened}
                onOpen={() => {
                    store.set("errorMessage", '');
                    store.set('step', 'login');
                }}
                onClose={() => AppService.set("loginIsOpened", false)}
            >
                {store.step === 'login' && (
                    <>
                        <UiModal.Title>Вход в личный кабинет</UiModal.Title>
                        <UiModal.Description>Пожалуйста авторизуйтесь, чтобы оформить заказ</UiModal.Description>
                        <UiForm onSubmit={handleLogin}>
                            <UiForm.Control
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
                            </UiForm.Control>
                            <UiForm.Control
                                errorMessage={store.errorMessage}
                            >
                                <UiButton
                                    isLoading={store.isLoading}
                                    type={'submit'}
                                    label={'Продолжить'}
                                />
                            </UiForm.Control>
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
                        <div className="layout-header-login-confirm__title">
                            Сейчас вам поступит звонок. <br/>
                            Введите последние 4 цифры <br/>
                            входящего звонка
                        </div>
                        <UiModal.Description>
                            на Ваш телефон <br/>
                            <b>{useMask('+{7} (000) 000 00-00', store.phone)}</b>
                        </UiModal.Description>
                        <UiForm onSubmit={handleConfirm}>

                            <label className="layout-header-login-confirm-code">
                                <input
                                    autoFocus
                                    type="text"
                                    className="layout-header-login-confirm-code__control"
                                    value={store.code}
                                    maxLength={4}
                                    onChange={(e) => {
                                        store.set("code", (e.target.value || '').replace(/[^0-9.]/g, ''))
                                    }}
                                />
                                <div className="layout-header-login-confirm-code__items">
                                    <div className={classnames("layout-header-login-confirm-code__item", {
                                        'layout-header-login-confirm-code__item--active': !!store.code.at(0)
                                    })}>
                                        {store.code.at(0)}
                                    </div>
                                    <div className={classnames("layout-header-login-confirm-code__item", {
                                        'layout-header-login-confirm-code__item--active': !!store.code.at(1)
                                    })}>
                                        {store.code.at(1)}
                                    </div>
                                    <div className={classnames("layout-header-login-confirm-code__item", {
                                        'layout-header-login-confirm-code__item--active': !!store.code.at(2)
                                    })}>
                                        {store.code.at(2)}
                                    </div>
                                    <div className={classnames("layout-header-login-confirm-code__item", {
                                        'layout-header-login-confirm-code__item--active': !!store.code.at(3)
                                    })}>
                                        {store.code.at(3)}
                                    </div>
                                </div>
                            </label>
                            <UiForm.Control
                                errorMessage={store.errorMessage}
                            >
                                <UiButton
                                    isDisabled={!store.code || store.code.length < 4}
                                    isLoading={store.isLoading}
                                    type={'submit'}
                                    label={'Продолжить'}
                                />
                            </UiForm.Control>
                            <div
                                className="layout-header-login-confirm__again"
                                onClick={() => {
                                    store.set("step", "login")
                                }}
                            >
                                Запросить звонок еще раз
                            </div>
                        </UiForm>
                    </>
                )}
            </UiModal>
        </div>
    );
});
