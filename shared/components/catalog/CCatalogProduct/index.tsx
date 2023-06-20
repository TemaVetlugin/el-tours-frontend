'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";
import { UiButton, UiIcon, UiLink, UiPrice, UiQuantity } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { userFavoriteToggleQuery } from "shared/queries/main";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProduct = observer(({ catalogProduct }: PropsType) => {
    const cartItem = CartService.cartItems.find(cartItem => cartItem.catalogProductId === catalogProduct.id);
    const inFavorite = UserService.user.userFavorites.some(userFavorite => userFavorite.catalogProductId === catalogProduct.id);

    const handleToggleFavorite = async () => {
        if (!UserService.isAuthorized()) {
            return;
        }

        // optimistic update
        UserService.user.update({
            userFavorites: inFavorite
                ? UserService.user.userFavorites.filter(userFavorite => userFavorite.catalogProductId !== catalogProduct.id)
                : [
                    ...UserService.user.userFavorites,
                    {
                        id: Date.now(),
                        catalogProductId: catalogProduct.id
                    }
                ]
        });

        const { isSuccess, data } = await userFavoriteToggleQuery({
            catalogProductId: catalogProduct.id
        });
        if (isSuccess && data) {
            UserService.user.update({
                userFavorites: data.items
            });
        }
    }

    return (
        <UiLink href={ROUTES.PRODUCT(catalogProduct.slug).url} className="c-catalog-product">
            <div
                className="c-catalog-product__image"
                style={{ backgroundImage: `url(${catalogProduct.imageThumbnail})` }}
            />
            <div className="c-catalog-product__badges">
                {catalogProduct.withDelivery && (
                    <div className="c-catalog-product-badge" style={{ backgroundColor: '#00A3B3' }}>
                        <div className="c-catalog-product-badge__name">
                            Доставим на дом
                        </div>
                        <UiIcon size={24} name={'delivery'} color={COLORS.WHITE}/>
                    </div>
                )}
                {catalogProduct.withDelivery && (
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
                <UiPrice prices={catalogProduct.prices}/>
            </div>
            {catalogProduct.catalogProductOffers.length > 0 && (
                <div className="c-catalog-product__footer">
                    {!cartItem && (
                        <>
                            <UiButton onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                CartService.save({
                                    catalogProductId: catalogProduct.id,
                                    quantity: 1
                                });
                            }}>
                                <span>В корзину</span>
                                <UiIcon size={24} name={"cart"}/>
                            </UiButton>
                        </>
                    )}
                    {cartItem && (
                        <>
                            <UiQuantity value={cartItem.quantity} onChange={(data) => {
                                if (!cartItem || !data.value) {
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
                                href={ROUTES.CART().url}
                                label={'В корзине'}
                            />
                        </>
                    )}
                    <div
                        className="c-catalog-product__favorite"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleFavorite();
                        }}
                    >
                        <UiIcon
                            size={24}
                            name={inFavorite ? "heartFilled" : "heart"}
                            color={COLORS.GRAY_PRIMARY}
                        />
                    </div>
                </div>
            )}
        </UiLink>
    )
})
