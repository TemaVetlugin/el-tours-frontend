'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiDataBoundary, UiIcon, UiPage, UiWrap } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService } from "shared/services";
import { CCartItem, CCartTotal } from "shared/components/cart";
import { useAsyncEffect, useCity, useObservable, useUser } from "shared/hooks";
import { CatalogProductModel, StoreModel } from "shared/models";
import { cartQuery } from "shared/queries/frontend";
import { CCatalogProductsSlider } from "shared/components/catalog";
import { currency } from "shared/utilities";

import './page.scss';

export const Client = observer(() => {
    const city = useCity();
    const user = useUser();
    const store = useObservable({
        deliveryType: 'selfpickup',
        deliveryStore: null as StoreModel | null,
        recommendations: [] as CatalogProductModel[]
    });

    useAsyncEffect(async () => {
        if (!user.isInitialized) {
            return;
        }
        const { isSuccess, data } = await cartQuery({ cityId: city.id });
        if (isSuccess && data) {
            store.set('recommendations', data.recommendations.map(item => new CatalogProductModel(item)));
            store.set("deliveryStore", data.deliveryStore ? new StoreModel(data.deliveryStore) : null);
        }
    }, [city, store, user])

    return (
        <UiPage className={'p-cart'}>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.CART()]}/>
                <UiPage.Title
                    value={'Корзина'}
                    aside={() => {
                        if (CartService.cartItems.length === 0) {
                            return null
                        }
                        return (
                            <UiButton
                                onClick={() => {
                                    CartService.clear()
                                }}
                                size={"small"}
                                colors={{
                                    button: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
                                    label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    icon: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY]
                                }}
                            >
                                <span>Очистить корзину</span>
                                <UiIcon size={16} name={'trash'}/>
                            </UiButton>
                        )
                    }}
                />
                <UiDataBoundary isLoading={CartService.isLoading}>
                    <div className="p-cart__inner">
                        <div className="p-cart__main">
                            <div className="p-cart__header">
                                <div className="p-cart-delivery">
                                    <div className="p-cart-delivery-type">
                                        <UiIcon size={24} name={'deliverySelfpickup'}/>
                                        <div className="p-cart-delivery-type__inner">
                                            <div className="p-cart-delivery-type__name">Самовывоз</div>
                                            <div className="p-cart-delivery-type__price">Бесплатно</div>
                                        </div>
                                    </div>
                                </div>
                                {store.deliveryStore && (
                                    <div className="p-cart-delivery">
                                        <div className="p-cart-delivery-type">
                                            <UiIcon size={24} name={'deliveryCourier'}/>
                                            <div className="p-cart-delivery-type__inner">
                                                <div className="p-cart-delivery-type__name">Доставка</div>
                                                <div className="p-cart-delivery-type__price">{currency(store.deliveryStore.deliveryPrice)}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {CartService.cartItems.map((cartItem) => (
                                <CCartItem key={cartItem.id} cartItem={cartItem}/>
                            ))}
                        </div>
                        <div className="p-cart__aside">
                            <CCartTotal
                                total={CartService.totalPrices()}
                                items={[
                                    ['Товаров', CartService.quantity]
                                ]}
                            >
                                <div className="p-cart-total__warning">
                                    <UiIcon size={16} name={'exclamationTriangle'} color={COLORS.GRAY_PRIMARY}/>
                                    <span>Окончательная цена зависит от выбранной аптеки</span>
                                </div>
                                <UiButton
                                    href={ROUTES.CHECKOUT().url}
                                    label={'Продолжить'}
                                />
                            </CCartTotal>
                        </div>
                    </div>
                </UiDataBoundary>
                <UiPage.Section title={'С этим товаром покупают'}>
                    <CCatalogProductsSlider catalogProducts={store.recommendations}/>
                </UiPage.Section>
            </UiWrap>
        </UiPage>
    )
});
