'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CartItemModel } from "shared/models";

import { UiIcon, UiLink, UiPrice, UiQuantity } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService } from "shared/services/Cart.service";

import './index.scss';

type PropsType = {
    cartItem: CartItemModel,
}

export const CCartItem = observer(({ cartItem }: PropsType) => {
    return (
        <div className="c-cart-item">
            <div
                className="c-cart-item__image"
                style={{
                    backgroundImage: `url(${cartItem.catalogProduct.imageThumbnail})`
                }}
            />
            <div className="c-cart-item__main">
                <UiLink
                    href={ROUTES.PRODUCT(cartItem.catalogProduct.slug).url}
                    className="c-cart-item__name"
                >
                    {cartItem.catalogProduct.name}
                </UiLink>
                <div className="c-cart-item__info">
                    {cartItem.catalogProduct.withDelivery && (
                        <div className="c-cart-item__badge" style={{ backgroundColor: '#00A3B3' }}>
                            <UiIcon size={19} name={'delivery'} color={COLORS.WHITE}/>
                        </div>
                    )}
                    {cartItem.catalogProduct.withDelivery && (
                        <div className="c-cart-item__badge" style={{ backgroundColor: '#E21F25' }}>
                            <UiIcon size={24} name={'exclamationMark'} color={COLORS.WHITE}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="c-cart-item__quantity">
                <UiQuantity value={cartItem.quantity} onChange={(data) => {
                    cartItem.update({
                        quantity: data.value
                    });
                    CartService.save(cartItem);
                }}/>
            </div>
            <div className="c-cart-item__price">
                <UiPrice
                    quantity={cartItem.quantity}
                    prices={cartItem.catalogProduct.prices}
                />
            </div>
        </div>
    )
})
