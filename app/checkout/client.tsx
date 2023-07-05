'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useNavigate, useObservable, useUser } from "shared/hooks";
import { UiButton, UiCheckbox, UiDataBoundary, UiForm, UiLink, UiMap, UiPage, UiPrice, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { CCartTotal } from "shared/components/cart";
import { currency } from "shared/utilities";
import { CheckoutItemModel } from "shared/models";
import { checkoutQuery, ordersCreateQuery } from "shared/queries/main";
import { CCheckoutStore } from "shared/components/checkout";

import sectionIcon from './assets/section-icon.svg';

import './page.scss';

export const Client = observer(() => {
    const navigate = useNavigate();
    const city = useCity();
    const user = useUser();
    const store = useObservable({
        isLoading: true,
        isSubmitting: false,
        checkoutItems: [] as CheckoutItemModel[],
    })
    const form = useObservable({
        isAccepted: 1,
        storeId: null as number | null,
    });

    useAsyncEffect(async () => {
        if (!user.isInitialized) {
            return;
        }
        store.set("isLoading", true);
        const { isSuccess, data } = await checkoutQuery({
            cityId: city.id
        });

        if (isSuccess && data) {
            store.set("checkoutItems", data.items.map(item => new CheckoutItemModel(item)));
        }
        store.set("isLoading", false);
    }, [store, city, user]);


    const handleSubmit = async () => {
        if (!UserService.isAuthorized() || !form.storeId) {
            return;
        }
        store.set("isSubmitting", true);
        const { isSuccess, data } = await ordersCreateQuery({
            storeId: form.storeId
        });

        if (data) {
            navigate(ROUTES.ORDER(data.item.id).url)
        } else {
            store.set("isSubmitting", false);
        }
    }

    const cartItems = CartService.cartItems.filter(cartItem => {
        if (!form.storeId) {
            return true;
        }
        return cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === form.storeId);
    });

    const checkoutItem = form.storeId
        ? (store.checkoutItems.find(checkoutItem => checkoutItem.store.id === form.storeId) || null)
        : null;

    return (
        <UiPage className={'p-checkout'}>
            <UiForm onSubmit={handleSubmit}>
                <UiWrap>
                    <UiPage.Breadcrumbs items={[ROUTES.CHECKOUT()]}/>
                    <UiPage.Title value={'Оформление заказа'}/>
                    <UiDataBoundary isLoading={store.isLoading}>
                        <div className="p-checkout__inner">
                            <div className="p-checkout__main">
                                <div className="p-checkout-section">
                                    <div className="p-checkout-section__header">
                                        <div
                                            className="p-checkout-section__icon"
                                            style={{ backgroundImage: `url(${sectionIcon.src})` }}
                                        >
                                            1
                                        </div>
                                        <div className="p-checkout-section__title">Выберите аптеку</div>
                                    </div>
                                    <div className="p-checkout-section__inner p-checkout-section__inner--stores">
                                        <div className="p-checkout-section__stores">
                                            {store.checkoutItems.map(checkoutItem => (
                                                <CCheckoutStore
                                                    key={checkoutItem.id}
                                                    name={'storeId'}
                                                    value={form.storeId}
                                                    onChange={form.handleChange}
                                                    checkoutItem={checkoutItem}
                                                />
                                            ))}
                                        </div>
                                        <UiMap
                                            className={'p-checkout-section__map'}
                                            location={city.location}
                                            zoom={city.zoom}
                                            render={(map) => store.checkoutItems.map(checkoutItem => (
                                                <UiMap.Marker
                                                    key={checkoutItem.store.id}
                                                    map={map}
                                                    location={checkoutItem.store.location}
                                                />
                                            ))}
                                        />
                                    </div>
                                </div>
                                <div className="p-checkout-section">
                                    <div className="p-checkout-section__header">
                                        <div className="p-checkout-section__icon">2</div>
                                        <div className="p-checkout-section__title">Состав заказа</div>
                                    </div>
                                    <div className="p-checkout-section__inner">
                                        {cartItems.map((cartItem) => {
                                            let prices: number[] = [];
                                            const offer = cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === form.storeId);
                                            if (form.storeId && !offer) {
                                                return null;
                                            }
                                            prices = !form.storeId
                                                ? cartItem.catalogProduct.catalogProductOffers.map(offer => offer.price)
                                                : (offer?.price ? [offer.price] : []);
                                            return (
                                                <div key={cartItem.id} className="p-checkout-catalog-product">
                                                    <div
                                                        className="p-checkout-catalog-product__image"
                                                        style={{ backgroundImage: `url(${cartItem.catalogProduct.image})` }}
                                                    />
                                                    <div className="p-checkout-catalog-product__body">
                                                        <div className="p-checkout-catalog-product__name">
                                                            {cartItem.catalogProduct.name}
                                                        </div>
                                                    </div>
                                                    <div className="p-checkout-catalog-product__price">
                                                        <UiPrice
                                                            price={prices}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="p-checkout__aside">
                                <CCartTotal
                                    total={!checkoutItem
                                        ? store.checkoutItems.map(checkoutItem => checkoutItem.order.total)
                                        : [checkoutItem.order.total]
                                    }
                                    items={!checkoutItem ? [] : [
                                        ['Кол-во товаров', checkoutItem.quantity],
                                        ['Стоимость товаров', currency(checkoutItem.order.totalOriginal)],
                                        ['Скидка', currency(checkoutItem.order.loyaltyDiscount)],
                                    ]}
                                >
                                    <UiButton
                                        type={'submit'}
                                        isDisabled={!form.storeId}
                                        label={'Оформить заказ'}
                                        isLoading={store.isSubmitting}
                                    />
                                    <UiCheckbox
                                        isRequired
                                        style={{ marginTop: 24 }}
                                        name={'isAccepted'}
                                        value={form.isAccepted}
                                        onChange={form.handleChange}
                                    >
                                        Ознакомлен и согласен с условиями <UiLink href={'#'}>Пользовательского
                                        соглашения</UiLink> и <UiLink href={'#'}>Политики конфиденциальности</UiLink>
                                    </UiCheckbox>
                                </CCartTotal>
                            </div>
                        </div>
                    </UiDataBoundary>
                </UiWrap>
            </UiForm>
        </UiPage>
    )
});
