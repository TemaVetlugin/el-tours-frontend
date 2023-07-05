'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiButton, UiDataBoundary, UiIcon, UiPage, UiWrap } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService } from "shared/services";
import { CCartItem, CCartTotal } from "shared/components/cart";

import './page.scss';

export const Client = observer(() => {
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
    )
});
