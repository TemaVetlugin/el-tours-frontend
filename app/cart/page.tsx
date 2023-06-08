'use client';

import React from "react";

import { useObservable, useObserve } from "shared/hooks";
import { UiButton, UiDataBoundary, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CartService } from "shared/services";
import { CCartTotal, CCartItem } from "shared/components/cart";

import './page.scss';

export default function CartPage() {
    const store = useObservable({
        count: 1
    })

    return useObserve(() => (
        <UiPage className={'p-cart'}>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.CART()]}/>
                <UiPage.Title value={'Корзина'}/>
                <UiDataBoundary isLoading={CartService.isLoading}>
                    <div className="p-cart__inner">
                        <div className="p-cart__items">
                            {CartService.cartItems.map((cartItem) => (
                                <CCartItem key={cartItem.id} cartItem={cartItem}/>
                            ))}
                        </div>
                        <div className="p-cart__aside">
                            <CCartTotal>
                                <UiButton label={'Продолжить'}/>
                            </CCartTotal>
                        </div>
                    </div>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    ))
}
