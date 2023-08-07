'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { CCatalogProductFavorite, CCatalogProductRemind, CCatalogProductSubscribe } from "shared/components/catalog";
import { COLORS, ROUTES } from "shared/contants";
import { CatalogProductModel } from "shared/models";
import { CartService, UserService } from "shared/services";
import { UiButton, UiCard, UiIcon, UiLink, UiLoading, UiPrice, UiQuantity, UiShare } from "shared/ui";

import './index.scss';

type PropsType = {
    isLoading: boolean,
    catalogProduct: CatalogProductModel
}

export const PProductCommerce = observer(({ isLoading, catalogProduct }: PropsType) => {
    const cartItem = CartService.cartItems.find(cartItem => cartItem.catalogProductId === catalogProduct.id);

    if (isLoading) {
        return (
            <div className="p-product-commerce">
                <UiCard>
                    <UiLoading/>
                </UiCard>
            </div>
        )
    }

    if (catalogProduct.catalogProductOffers.length === 0) {
        return (
            <div className="p-product-commerce">
                <UiCard>
                    <div className="p-product-commerce__header">
                        <div className="p-product-commerce__unavailable">Нет в наличии</div>
                        <div className='p-product-commerce__actions'>
                            <CCatalogProductFavorite catalogProduct={catalogProduct}/>
                        </div>
                    </div>
                    <div className="p-product-commerce__body">
                        <CCatalogProductSubscribe catalogProduct={catalogProduct}/>
                    </div>
                    <div className="p-product-commerce__footer">
                        <CCatalogProductRemind catalogProduct={catalogProduct}/>
                    </div>
                </UiCard>
            </div>
        );
    }
    return (
        <div className="p-product-commerce">
            <UiCard>
                {catalogProduct.catalogProductOffers.length > 0 && (
                    <>
                        <div className="p-product-commerce__header">
                            <UiPrice
                                price={catalogProduct.price}
                                priceOffer={catalogProduct.priceOffer}
                                packageAmount={catalogProduct.packageAmount}
                            />
                            <div className='p-product-commerce__actions'>
                                <CCatalogProductFavorite catalogProduct={catalogProduct}/>
                                <UiShare template={'icon'}/>
                            </div>
                        </div>
                        <div className="p-product-commerce__body">
                            <div className="p-product-commerce__action">
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
                            </div>
                            <div className="p-product-commerce__hint">
                                Цена актуальна на момент заказа
                            </div>
                        </div>
                    </>
                )}
                <div className="p-product-commerce__footer">
                    <CCatalogProductRemind catalogProduct={catalogProduct}/>
                </div>
                <UiLink href={'#stores'} className="p-product-commerce__availability">
                    В наличии в <span>{catalogProduct.catalogProductOffers.length} аптеках</span>
                </UiLink>
            </UiCard>
        </div>

    )
});
