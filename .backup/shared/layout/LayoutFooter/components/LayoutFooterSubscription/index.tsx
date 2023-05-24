import React from "react";
import { observer } from "mobx-react";

import { COLORS, ROUTES } from "shared/contants";
import { UiButton, UiCheckbox, UiForm, UiFormControl, UiLink } from "shared/uikit";
import { useObservable, useValidation } from "shared/hooks";
import { isEmail, isRequired } from "shared/validations";
import { newsSubscriptionCreateRequest } from "shared/requests/api";

import image from './assets/image.svg';

import './index.scss';

export const LayoutFooterSubscription = observer(() => {
    const store = useObservable({
        isChecked: 0,
        email: '',
        isApplied: false
    });

    const validation = useValidation(store, {
        email: [isRequired(), isEmail()]
    });

    const handleSubmit = () => {
        validation.enableErrors()
        if (!validation.isValid) {
            return;
        }

        newsSubscriptionCreateRequest({
            email: store.email
        });
        store.set("isApplied", true);
    }

    return (
        <div className='layout-footer-subscription'>
            <div className="layout-footer-subscription__inner">
                <div className="layout-footer-subscription__info">
                    <div
                        className="layout-footer-subscription__image"
                        style={{ backgroundImage: `url(${image.src})` }}
                    />
                    <div className="layout-footer-subscription__content">
                        <div className="layout-footer-subscription__title">Подпишитесь на наши новости</div>
                        <div className="layout-footer-subscription__text">
                            Узнавайте первым об акциях, новостях, статьях и&nbsp;скидках до 70%
                        </div>
                    </div>
                </div>
                {store.isApplied && (
                    <div className="layout-footer-subscription__group">
                        <div className="layout-footer-subscription__title">Успешно!</div>
                        <div className="layout-footer-subscription__text">
                            Ваша подписка была успешно оформлена
                        </div>
                    </div>
                )}
                {!store.isApplied && (
                    <UiForm onSubmit={handleSubmit} className="layout-footer-subscription-form">
                        <div className="layout-footer-subscription-form__inner">
                            <UiFormControl errorMessage={validation.email.errorMessage}>
                                <input
                                    type="text"
                                    className="layout-footer-subscription-form__control"
                                    placeholder="Ваш e-mail"
                                    value={store.email}
                                    onChange={(e) => {
                                        store.set("email", e.target.value || '')
                                    }}
                                />
                            </UiFormControl>
                            <UiButton
                                type='submit'
                                hasBorder={false}
                                label="ПОДПИСАТЬСЯ"
                                style={{ padding: '0 28px' }}
                                colors={{
                                    button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                                    label: [COLORS.WHITE, COLORS.WHITE]
                                }}
                            />
                        </div>
                        <div className="layout-footer-subscription-form__checkbox">
                            <UiCheckbox
                                isRequired
                                value={store.isChecked}
                                name='isChecked'
                                onChange={store.handleChange}
                                label={<>Я согласен на обработку <UiLink href={ROUTES.P_PERSONAL_DATA()}>персональных
                                    данных</UiLink></>}
                            />
                        </div>
                    </UiForm>
                )}
            </div>
        </div>
    )
})

