'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";
import { UiButton, UiIcon, UiLink, UiPrice, UiQuantity } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { userFavoriteToggleQuery } from "shared/queries/main";
import { useNavigate, useObservable, useUser } from "shared/hooks";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProduct = observer(({ catalogProduct }: PropsType) => {
    const navigate = useNavigate();
    const store = useObservable({
        isLoading: false,
    })
    const cartItem = CartService.cartItems.find(cartItem => cartItem.catalogProductId === catalogProduct.id);

    return (
        <UiLink href={ROUTES.PRODUCT(catalogProduct.slug).url} className="c-catalog-product">
            <div
                className="c-catalog-product__image"
                style={{ backgroundImage: `url(${catalogProduct.image})` }}
            />
            <div className="c-catalog-product__badges">
                {catalogProduct.isDeliverable && (
                    <div className="c-catalog-product-badge" style={{ backgroundColor: '#00A3B3' }}>
                        <div className="c-catalog-product-badge__name">
                            Доставим на дом
                        </div>
                        <UiIcon size={24} name={'deliveryCourier'} color={COLORS.WHITE}/>
                    </div>
                )}
                {catalogProduct.isDeliverable && (
                    <div className="c-catalog-product-badge" style={{ backgroundColor: '#E21F25' }}>
                        <div className="c-catalog-product-badge__name">
                            Требуется рецепт
                        </div>
                        <UiIcon size={24} name={'exclamationMark'} color={COLORS.WHITE}/>
                    </div>
                )}
            </div>
            <div className="c-catalog-product__name">
                {catalogProduct.name}
            </div>
            <div className="c-catalog-product__price">
                <UiPrice
                    priceOffer={catalogProduct.priceOffer}
                    price={catalogProduct.price}
                />
            </div>
            {catalogProduct.catalogProductOffers.length > 0 && (
                <div className="c-catalog-product__footer">
                    {!cartItem && (
                        <>
                            <UiButton onClick={async (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                store.set("isLoading", true);
                                await CartService.save({
                                    catalogProductId: catalogProduct.id,
                                    quantity: 1
                                });
                                store.set("isLoading", false);
                            }}>
                                <span>В корзину</span>
                                <UiIcon size={24} name={"cart"}/>
                            </UiButton>
                        </>
                    )}
                    {cartItem && (
                        <>
                            <UiQuantity value={cartItem.quantity} onChange={(data) => {
                                if (!cartItem || data.value === null) {
                                    return;
                                }
                                cartItem.update({
                                    quantity: data.value
                                })
                                CartService.save({
                                    catalogProductId: catalogProduct.id,
                                    quantity: data.value
                                })
                            }}/>
                            <UiButton
                                colors={{
                                    button: [COLORS.TRANSPARENT, COLORS.LIGHT_BLUE],
                                    label: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(ROUTES.CART());
                                }}
                                label={'В корзине'}
                            />
                        </>
                    )}
                    <div
                        className="c-catalog-product__favorite"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            UserService.toggleFavorite(catalogProduct.id)
                        }}
                    >
                        <UiIcon
                            size={24}
                            name={UserService.hasFavorite(catalogProduct.id) ? "heartFilled" : "heart"}
                            color={COLORS.GRAY_PRIMARY}
                        />
                    </div>
                </div>
            )}
        </UiLink>
    )
})
