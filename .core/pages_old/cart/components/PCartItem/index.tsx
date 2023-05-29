import React from "react";
import { observer } from "mobx-react";

import { UiCheckbox, UiLink, UiQuantity } from "shared/uikit";
import { ROUTES } from "shared/contants";
import { CartItemModel } from "shared/models";
import { useDebouncedCallback, useIsAuthorized } from "shared/hooks";
import { CatalogModule, OrderModule } from "shared/modules";
import { toCurrency } from "shared/utilities";
import { cartItemsToggleBulkUpdate } from "shared/requests/api";

import "./index.scss";

type PropsType = {
    cartItem: CartItemModel,
}

export const PCartItem = observer(({ cartItem }: PropsType) => {
    const isAuthorized = useIsAuthorized();

    const updateQuantity = useDebouncedCallback((cartItem: CartItemModel) => {
        OrderModule.updateCartItem(cartItem);
    }, 550);

    return (
        <div className="p-cart-item">
            <div className="p-cart-item__checkbox">
                <UiCheckbox
                    value={cartItem.isActive}
                    onChange={(data) => {
                        cartItem.update({ isActive: data.value });
                        cartItemsToggleBulkUpdate({
                            cartItems: [{
                                catalogProductId: cartItem.catalogProductId,
                                isActive: cartItem.isActive,
                            }]
                        });
                    }}
                />
            </div>
            <div
                className="p-cart-item__image"
                style={{ backgroundImage: `url(${cartItem.catalogProduct.previewImageThumbnail})` }}
            />
            <div className="p-cart-item__inner">
                <div className="p-cart-item__info">
                    <UiLink href={ROUTES.PRODUCT(cartItem.catalogProduct.slug)} className="p-cart-item__name">
                        {cartItem.catalogProduct.name}
                    </UiLink>
                    <div className="p-cart-item__actions">
                        <div
                            onClick={() => OrderModule.deleteCartItem(cartItem.catalogProductId)}
                            className="p-cart-item__button"
                        >
                            Удалить
                        </div>
                        <div
                            className="p-cart-item__button"
                            onClick={() => {
                                if (!isAuthorized) {
                                    window.location.hash = '#login';
                                    return;
                                    ``
                                }
                                CatalogModule.toggleFavorite(cartItem.catalogProductId)
                            }}
                        >
                            {CatalogModule.isFavorite(cartItem.catalogProductId) ? 'В избранном' : 'В избранное'}
                        </div>
                    </div>
                </div>
                <div className="p-cart-item-quantity">
                    <div className="p-cart-item-quantity__control">
                        <UiQuantity
                            value={cartItem.quantity}
                            onChange={({ value }) => {
                                cartItem.update({ quantity: value });
                                updateQuantity(cartItem);
                            }}
                        />
                    </div>
                    <div className="p-cart-item-quantity__description">
                        от <span>{cartItem.catalogProduct.priceFrom}</span> ₽/шт.
                    </div>
                </div>
                <div className="p-cart-item-price">
                    {cartItem.totalFrom && (
                        <div className="p-cart-item-price__current">{toCurrency(cartItem.totalFrom, 'от ')}</div>
                    )}
                </div>
            </div>
        </div>
    )
});
