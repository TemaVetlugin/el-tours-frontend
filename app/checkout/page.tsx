'use client';

import React from "react";

import { useAsyncEffect, useCity, useObservable, useObserve } from "shared/hooks";
import { UiButton, UiCheckbox, UiDataBoundary, UiForm, UiLink, UiMap, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService } from "shared/services";
import { CCartTotal } from "shared/components/cart";

import { StoreModel } from "shared/models";
import { storesQuery } from "shared/queries/main";
import { CCheckoutStore } from "shared/components/checkout";

import sectionIcon from './assets/section-icon.svg';
import './page.scss';


export default function CartPage() {
    const city = useCity();
    const store = useObservable({
        isLoading: true,
        stores: [] as StoreModel[]
    })
    const form = useObservable({
        isAccepted: 1,
        storeId: null as number | null,
    });

    useAsyncEffect(async () => {
        store.set("isLoading", true);
        await CartService.boot({
            cityId: city.id
        });
        const { isSuccess, data } = await storesQuery({
            cityId: city.id
        });

        if (isSuccess && data) {
            store.set("stores", data.items.map(item => new StoreModel(item)));
        }
        store.set("isLoading", false);
    }, [store, city]);

    const cartItems = CartService.cartItems.filter(cartItem => {
        if (!form.storeId) {
            return true;
        }
        return cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === form.storeId);
    });

    return useObserve(() => (
        <UiPage className={'p-checkout'}>
            <UiForm>
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
                                            {store.stores.map(item => (
                                                <CCheckoutStore
                                                    key={item.id}
                                                    name={'storeId'}
                                                    value={form.storeId}
                                                    onChange={form.handleChange}
                                                    store={item}
                                                />
                                            ))}
                                        </div>
                                        <UiMap
                                            className={'p-checkout-section__map'}
                                            location={city.location}
                                            zoom={city.zoom}
                                            render={(map) => store.stores.map(item => (
                                                <UiMap.Marker key={item.id} map={map} location={item.location}/>
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
                                            return (
                                                <div key={cartItem.id} className="p-checkout-catalog-product">
                                                    <div
                                                        className="p-checkout-catalog-product__image"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="p-checkout__aside">
                                <CCartTotal>
                                    <UiButton
                                        type={'submit'}
                                        isDisabled={!form.storeId}
                                        label={'Оформить заказ'}
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
    ))
}
