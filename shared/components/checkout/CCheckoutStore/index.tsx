'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { StoreModel } from "shared/models";
import { UiButton } from "shared/ui";
import { ChangeHandlerType } from "shared/types";

import { CartService } from "shared/services";
import { currency } from "shared/utilities";
import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    store: StoreModel,
    value: number | null,
    name: string,
    onChange: ChangeHandlerType<number>
}

export const CCheckoutStore = observer(({ store, value, name, onChange }: PropsType) => {
    const cartItems = CartService.cartItems.filter(cartItem => {
        return cartItem.catalogProduct.catalogProductOffers.some(offer => {
            return offer.storeId === store.id;
        });
    });

    const total = cartItems.reduce((total, cartItem) => {
        const offer = cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === store.id);
        if (!offer) {
            return total;
        }
        return total + (cartItem.quantity * offer.price);
    }, 0);

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="c-checkout-store">
            <div className="c-checkout-store__header">
                <div className="c-checkout-store__name">{store.name}</div>
                <UiButton
                    label={store.id === value ? 'Выбрана' : 'Выбрать'}
                    size={"small"}
                    colors={store.id === value
                        ? {
                            button: [COLORS.TRANSPARENT, COLORS.LIGHT_BLUE],
                            label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                            border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                        }
                        : {}
                    }
                    onClick={() => {
                        onChange({
                            name,
                            value: store.id
                        })
                    }}
                />
            </div>
            <div className="c-checkout-store__body">
                <div className="c-checkout-store__info">
                    <div className="c-checkout-store__brand">{store.storeBrand.name}</div>
                    <div className="c-checkout-store__address">{store.address}</div>
                </div>
                <div className="c-checkout-store__additional">
                    <div className="c-checkout-store__total">
                        {currency(total)}
                    </div>
                    <div className="c-checkout-store__quantity">
                        Товаров: {cartItems.length} из {CartService.cartItems.length}
                    </div>
                </div>
            </div>
            <div className="c-checkout-store-products">
                <div className="c-checkout-store-products__title">{cartItems.length} товара в наличии:</div>
                {cartItems.map(cartItem => {
                    const offer = cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === store.id);
                    if (!offer) {
                        return null;
                    }
                    return (
                        <div key={cartItem.id} className="c-checkout-store-product">
                            <div className="c-checkout-store-product__name">{cartItem.catalogProduct.name}</div>
                            <div className="c-checkout-store-product__prices">
                                <div className="c-checkout-store-product__total">
                                    {currency(offer.price * cartItem.quantity)}
                                </div>
                                <div className="c-checkout-store-product__quantity">
                                    {cartItem.quantity} X {currency(offer.price)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
})
