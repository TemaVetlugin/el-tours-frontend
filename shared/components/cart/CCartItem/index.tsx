'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CartItemModel } from "shared/models";

import { UiIcon, UiLink, UiPrice, UiQuantity } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { currency } from "shared/utilities";

import './index.scss';

type PropsType = {
    cartItem: CartItemModel,
}

export const CCartItem = observer(({ cartItem }: PropsType) => {
    const priceOfferMin = Math.min(...cartItem.catalogProduct.priceOffer);
    const priceOfferMax = Math.max(...cartItem.catalogProduct.priceOffer);
    let priceOffer: number[] | string[] = priceOfferMax === priceOfferMin ? [priceOfferMin] : [priceOfferMin, priceOfferMax];
    priceOffer = priceOffer.map(value => currency(value));

    return (
        <div className="c-cart-item">
            <div
                className="c-cart-item__image"
                style={{
                    backgroundImage: `url(${cartItem.catalogProduct.image})`
                }}
            />
            <div className="c-cart-item__main">
                <UiLink
                    href={ROUTES.PRODUCT(cartItem.catalogProduct)}
                    className="c-cart-item__name"
                >
                    {cartItem.catalogProduct.name}
                </UiLink>
                <div className="c-cart-item__info">
                    {cartItem.catalogProduct.isDeliverable && (
                        <div className="c-cart-item__badge" style={{ backgroundColor: '#00A3B3' }}>
                            <UiIcon size={19} name={'deliveryCourier'} color={COLORS.WHITE}/>
                        </div>
                    )}
                    {cartItem.catalogProduct.withPrescription && (
                        <div className="c-cart-item__badge" style={{ backgroundColor: '#E21F25' }}>
                            <UiIcon size={24} name={'exclamationMark'} color={COLORS.WHITE}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="c-cart-item__quantity">
                <UiQuantity
                    value={cartItem.quantity}
                    onChange={(data) => {
                        cartItem.update({
                            quantity: data.value
                        });
                        CartService.save(cartItem);
                    }}
                    onChanging={() => {
                        CartService.set("isSaving", true);
                    }}
                />
                <div className="c-cart-item__price-offer">
                    {priceOffer.join('-')}/шт.
                </div>
                <div className="c-cart-item__actions">
                    {UserService.hasFavorite(cartItem.catalogProductId) && (
                        <div className="c-cart-item__action" onClick={() => {
                            UserService.toggleFavorite(cartItem.catalogProductId)
                        }}>
                            <UiIcon size={16} name={'heartFilled'} color={COLORS.GRAY_PRIMARY}/>
                            <span>В избранном</span>
                        </div>
                    )}
                    {!UserService.hasFavorite(cartItem.catalogProductId) && (
                        <div className="c-cart-item__action" onClick={() => {
                            UserService.toggleFavorite(cartItem.catalogProductId)
                        }}>
                            <UiIcon size={16} name={'heart'} color={COLORS.GRAY_PRIMARY}/>
                            <span>В избранное</span>
                        </div>
                    )}
                    <div className="c-cart-item__action" onClick={() => {
                        CartService.save({
                            catalogProductId: cartItem.catalogProductId,
                            quantity: 0
                        })
                    }}>
                        <UiIcon size={16} name={'close'} color={COLORS.GRAY_PRIMARY}/>
                        <span>Удалить</span>
                    </div>
                </div>
            </div>
            <div className="c-cart-item__price">
                <UiPrice
                    quantity={cartItem.quantity}
                    price={cartItem.catalogProduct.price}
                />
            </div>
        </div>
    )
})
