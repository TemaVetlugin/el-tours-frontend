import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { UiButton, UiCheckbox, UiForm, UiFormControl, UiInput, UiLink, UiModal, UiQuantity } from "shared/uikit";
import { useDebouncedCallback, useIsInitialized, useObservable, useValidation } from "shared/hooks";
import { COLORS, ROUTES } from "shared/contants";
import { NotifierModule, OrderModule } from "shared/modules";
import { ICartItemModel } from "shared/models";
import { catalogProductSubscriptionsCreateRequest } from "shared/requests/api";
import { isEmail, isRequired } from "shared/validations";

import './index.scss';

type PropsType = {
    catalogProductId: number,
    colors?: {
        button?: string | [string, string],
        border?: string | [string, string],
        label?: string | [string, string]
    }
    withQuantity?: boolean
    isAvailable?: boolean
}

export const CAddToCart = observer(({ catalogProductId, withQuantity, isAvailable = false, colors = {} }: PropsType) => {
    const store = useObservable({
        isLoading: true,
        isSubscriptionModalOpened: false,
        isSubmitting: false,
    });

    const subscriptionForm = useObservable({
        email: '',
        accept: 0
    });

    const validation = useValidation(subscriptionForm, {
        email: [isRequired(), isEmail()]
    });

    const isInitilized = useIsInitialized();

    useEffect(() => {
        store.set("isLoading", !isInitilized);
    }, [isInitilized]);

    const updateCartItem = useDebouncedCallback((cartItem: ICartItemModel) => {
        OrderModule.updateCartItem(cartItem);
    }, 550);

    const handleAddToCart = async () => {
        if (!isInitilized) {
            return;
        }
        store.set("isLoading", true);
        await OrderModule.addCartItem(catalogProductId);
        store.set("isLoading", false);
    }

    const handleSubmit = async () => {
        validation.enableErrors();
        if (!validation.isValid) {
            return;
        }
        store.set("isSubmitting", true);
        await catalogProductSubscriptionsCreateRequest({
            ...subscriptionForm.toObject(),
            catalogProductId
        });
        store.set("isSubmitting", false);
        store.set("isSubscriptionModalOpened", false);
        subscriptionForm.reset();
        NotifierModule.alert('Вы успешно подписались на товар');
    }

    const cartItem = OrderModule.cartItemByCatalogProductId[catalogProductId] || null;

    if (!isAvailable) {
        return (
            <>
                <UiButton
                    style={{ width: 240 }}
                    colors={{
                        button: [COLORS.TRANSPARENT, COLORS.GRAY1],
                        border: [COLORS.GRAY1, COLORS.GRAY1],
                        label: [COLORS.BLACK, COLORS.WHITE],
                    }}
                    label='СООБЩИТЬ О ПОСТУПЛЕНИИ'
                    onClick={() => store.set("isSubscriptionModalOpened", true)}
                />
                <UiModal
                    title={'Сообщить о поступлении'}
                    isOpened={store.isSubscriptionModalOpened}
                    onClose={() => store.set("isSubscriptionModalOpened", false)}
                >
                    <UiForm onSubmit={handleSubmit}>
                        <UiFormControl label={'Ваш email'} errorMessage={validation.email.errorMessage}>
                            <UiInput
                                autoFocus
                                name={'email'}
                                onChange={subscriptionForm.handleChange}
                                value={subscriptionForm.email}
                            />
                        </UiFormControl>
                        <UiFormControl>
                            <UiCheckbox
                                isRequired
                                name={'accept'}
                                value={subscriptionForm.accept}
                                onChange={subscriptionForm.handleChange}
                                label={<>
                                    Я согласен на обработку
                                    <UiLink href={ROUTES.P_PERSONAL_DATA()}> персональных данных</UiLink>
                                </>}
                            />
                        </UiFormControl>
                        <UiButton
                            isLoading={store.isSubmitting}
                            label={'Подписаться'}
                            type={'submit'}
                            style={{ width: '100%' }}
                        />
                    </UiForm>
                </UiModal>
            </>
        );
    }
    if (OrderModule.inCart(catalogProductId)) {
        if (withQuantity) {
            return (
                <UiQuantity
                    value={cartItem?.quantity || 0}
                    onChange={({ value }) => {
                        cartItem?.update({ quantity: value });
                        updateCartItem({ catalogProductId, quantity: value });
                    }}
                />
            )
        }
        return (
            <UiButton
                className={'c-add-to-cart'}
                key={'redirect'}
                isLoading={store.isLoading}
                hasBorder={false}
                label={'ОФОРМИТЬ'}
                href={ROUTES.CART()}
                colors={{
                    button: [COLORS.PRIMARY2, COLORS.PRIMARY],
                    label: [COLORS.PRIMARY, COLORS.WHITE],
                }}
            />
        );
    }
    return (
        <UiButton
            className={'c-add-to-cart'}
            key={'add'}
            isLoading={store.isLoading}
            label={'ДОБАВИТЬ В КОРЗИНУ'}
            onClick={handleAddToCart}
            hasBorder
            colors={{
                ...colors
            }}
        />
    )
});
