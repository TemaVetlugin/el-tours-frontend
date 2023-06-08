'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CartItemModel } from "shared/models";

import { UiIcon, UiPrice, UiQuantity } from "shared/ui";
import { COLORS } from "shared/contants";
import { CartService } from "shared/services/Cart.service";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
}

export const CCartTotal = observer(({ children }: PropsType) => {
    return (
        <div className="c-cart-total">
            <div className="c-cart-total__title">Итого</div>
            <div className="c-cart-total__price">
                <UiPrice
                    prices={CartService.totalPrices}
                />
            </div>
            <div className="c-cart-total__fields">
                <div className="c-cart-total-field">
                    <div className="c-cart-total-field__name">Товаров</div>
                    <div className="c-cart-total-field__row"/>
                    <div className="c-cart-total-field__value">
                        {CartService.quantity}
                    </div>
                </div>
            </div>
            {children && (
                <div className="c-cart-total__children">
                    {children}
                </div>
            )}
        </div>
    )
})
