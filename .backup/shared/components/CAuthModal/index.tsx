import React, { useEffect } from "react";
import { observer } from "mobx-react";

import {
    UiButton,
    UiStickerCircle,
    UiForm,
    UiFormControl,
    UiInput,
    UiModal,
    UiModalDescription,
    UiModalTitle
} from "shared/uikit";
import { useIsAuthorized, useIsInitialized, useLocationHash, useObservable, useValidation } from "shared/hooks";
import { COLORS, MASKS } from "shared/contants";
import { isLength, isMobilePhone, isRequired } from "shared/validations";
import { usersConfirmRequest, usersLoginRequest } from "shared/requests/api";
import { BootstrapModule, UserModule } from "shared/modules";

import './index.scss';

export const CAuthModal = observer(() => {
    const isAuthorized = useIsAuthorized();
    const isInitialized = useIsInitialized();
    const locationHash = useLocationHash();

    const store = useObservable({
        isOpened: false,
        isLoading: false,
        errorMessage: '',
        isConfirmation: false,
        phone: ''
    });

    const form = useObservable({
        phone: '',
        code: '',
    });

    const validationLogin = useValidation(form, {
        phone: [isRequired(), isMobilePhone()],
    });

    const validationConfirm = useValidation(form, {
        phone: [isMobilePhone()],
        code: [isRequired(), isLength(6)],
    }, {
        code: (value: any) => value.toString().replaceAll('_', '')
    });

    useEffect(() => {
        if (isInitialized && !isAuthorized && locationHash === '#login') {
            store.set("isConfirmation", false);
            store.set("isOpened", true);
        }
    }, [isAuthorized, isInitialized, locationHash]);

    const handleSubmitLogin = async () => {
        validationLogin.enableErrors();
        store.set("errorMessage", '');
        if (!validationLogin.isValid || store.isLoading) {
            return;
        }
        store.set("isLoading", true);
        store.set("phone", form.phone);
        const { isSuccess, data, description } = await usersLoginRequest(form);
        if (isSuccess && data) {
            store.set("isConfirmation", true);
        } else {
            store.set("errorMessage", description);
        }
        store.set("isLoading", false);
    }

    const handleSubmitConfirm = async () => {
        validationConfirm.enableErrors();
        if (!validationConfirm.isValid || store.isLoading) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess, data, description } = await usersConfirmRequest(form);
        if (isSuccess && data) {
            UserModule.setAccessToken(data.accessToken);
            await BootstrapModule.client();
            store.set("isConfirmation", false);
            handleClose();
        } else {
            store.set("errorMessage", description);
        }
        store.set("isLoading", false);
    }

    const handleClose = () => {
        window.location.hash = '';
        store.set("isOpened", false);
        store.set("errorMessage", '');
    }

    if (store.isConfirmation) {
        return (
            <UiModal isOpened={store.isOpened} onClose={handleClose}>
                <UiStickerCircle size={102} name={'welcome'} stickerSize={49}/>
                <UiModalTitle value='Подтвердите номер телефона'/>
                <UiModalDescription>
                    Введите код, отправленный на номер телефона {store.phone}
                </UiModalDescription>
                <UiForm className="c-auth-modal__form" onSubmit={handleSubmitConfirm}>
                    <UiFormControl
                        label='Код'
                        style={{ marginBottom: 0 }}
                        errorMessage={validationConfirm.code.errorMessage || store.errorMessage}
                    >
                        <UiInput
                            value={form.code}
                            name='code'
                            onChange={form.handleChange}
                            mask={MASKS.AUTH_CODE}
                        />
                    </UiFormControl>
                    <UiButton
                        style={{ minWidth: 146 }}
                        isLoading={store.isLoading}
                        type='submit'
                        label='ПОДТВЕРДИТЬ'
                        hasBorder={false}
                        colors={{
                            button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                            label: COLORS.WHITE
                        }}
                    />
                </UiForm>
            </UiModal>
        )
    }
    return (
        <UiModal isOpened={store.isOpened} onClose={handleClose}>
            <div className="c-auth-modal__sticker">
                <UiStickerCircle size={102} name={'welcome'} stickerSize={49}/>
            </div>
            <UiModalTitle value='Авторизация' style={{ textAlign: 'center' }}/>
            <UiModalDescription style={{ textAlign: 'center' }}>
                Пожалуйста, авторизуйтесь
            </UiModalDescription>
            <UiForm className="c-auth-modal__form" onSubmit={handleSubmitLogin}>
                <UiFormControl
                    label='Ваш телефон'
                    style={{ marginBottom: 0 }}
                    errorMessage={validationLogin.phone.errorMessage || store.errorMessage}
                >
                    <UiInput
                        value={form.phone}
                        name='phone'
                        onChange={form.handleChange}
                        mask={MASKS.MOBILE_PHONE}
                        placeholder={'+7(___)___-__-__'}
                    />
                </UiFormControl>
                <UiButton
                    style={{ minWidth: 146 }}
                    isLoading={store.isLoading}
                    type='submit'
                    label='ОТПРАВИТЬ КОД'
                    hasBorder={false}
                    colors={{
                        button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                        label: COLORS.WHITE
                    }}
                />
            </UiForm>
        </UiModal>
    )
});
