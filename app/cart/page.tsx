'use client';

import React from "react";

import { useAsyncEffect, useCity, useObservable, useObserve } from "shared/hooks";
import { UiButton, UiDataBoundary, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService } from "shared/services";
import { CCartItem, CCartTotal } from "shared/components/cart";

import './page.scss';

export default function CartPage() {
    const city = useCity();
    const store = useObservable({
        isLoading: true
    });
    useAsyncEffect(async () => {
        await CartService.boot({
            cityId: city.id
        });
        store.set("isLoading", false);
    }, [city.id]);
    return useObserve(() => (
        <UiPage className={'p-cart'}>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.CART()]}/>
                <UiPage.Title value={'Корзина'}/>
                <UiDataBoundary isLoading={store.isLoading}>
                    <div className="p-cart__inner">
                        <div className="p-cart__main">
                            {CartService.cartItems.map((cartItem) => (
                                <CCartItem key={cartItem.id} cartItem={cartItem}/>
                            ))}
                        </div>
                        <div className="p-cart__aside">
                            <CCartTotal>
                                <UiButton
                                    href={ROUTES.CHECKOUT().url}
                                    label={'Продолжить'}
                                />
                            </CCartTotal>
                        </div>
                    </div>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    ))
}
