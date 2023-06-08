'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useObservable, useUser } from "shared/hooks";
import { UiButton, UiCheckbox, UiDataBoundary, UiForm, UiLink, UiMap, UiPage, UiPrice, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService } from "shared/services";
import { CCartTotal } from "shared/components/cart";

import { StoreModel } from "shared/models";
import { storesQuery } from "shared/queries/main";
import { CCheckoutStore } from "shared/components/checkout";

import sectionIcon from './assets/section-icon.svg';
import './page.scss';

export default observer(function CartPage() {
    const city = useCity();
    const user = useUser();
    const store = useObservable({
        isLoading: true,
        stores: [] as StoreModel[]
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
    }, [store, city, user]);

    const cartItems = CartService.cartItems.filter(cartItem => {
        if (!form.storeId) {
            return true;
        }
        return cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === form.storeId);
    });
    console.log(cartItems.length)

    return (
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
                                            console.log(cartItem.catalogProduct.name)
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
                                                        style={{ backgroundImage: `url(${cartItem.catalogProduct.imageThumbnail})` }}
                                                    />
                                                    <div className="p-checkout-catalog-product__body">
                                                        <div className="p-checkout-catalog-product__name">
                                                            {cartItem.catalogProduct.name}
                                                        </div>
                                                    </div>
                                                    <div className="p-checkout-catalog-product__price">
                                                        <UiPrice prices={prices}/>
                                                    </div>
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
    )
});
