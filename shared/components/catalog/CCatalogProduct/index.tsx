'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";
import { UiButton, UiDatepicker, UiIcon, UiLink, UiModal, UiPrice, UiQuantity } from "shared/ui";
import { COLORS, ROUTES } from "shared/contants";
import { CartService, UserService } from "shared/services";
import { useObservable, useRouter } from "shared/hooks";

import './index.scss';
import { date, Notifier } from "shared/utilities";
import { userRemindersSaveQuery } from "shared/queries/main";

type PropsType = {
    catalogProduct: CatalogProductModel,
    withRemind?: boolean
}

export const CCatalogProduct = observer(({ catalogProduct, withRemind = true }: PropsType) => {
    const router = useRouter();
    const store = useObservable({
        isLoading: false,
        isRemind: false,
        remindAt: date().plus({ days: 7 }).toISO()
    })
    const cartItem = CartService.cartItems.find(cartItem => cartItem.catalogProductId === catalogProduct.id);

    const handleSubmitRemind = async () => {
        userRemindersSaveQuery({
            catalogProductId: catalogProduct.id,
            remindAt: store.remindAt as string
        });
        Notifier.alert('Напоминание зарегистрировано, мы сообщим Вам когда придёт время напоминания - пришлем пуш или смс');
        store.set("isRemind", false);
    }

    return (
        <>
            <UiLink href={ROUTES.PRODUCT(catalogProduct.slug).url} className="c-catalog-product">
                <div
                    className="c-catalog-product__image"
                    style={{ backgroundImage: `url(${catalogProduct.image})` }}
                />
                {catalogProduct.badges.length > 0 && (
                    <div className="c-catalog-product__badges">
                        {catalogProduct.badges.map(badge => (
                            <div key={badge.icon} className="c-catalog-product-badge" style={{ backgroundColor: badge.color }}>
                                <div className="c-catalog-product-badge__name">{badge.label}</div>
                                <UiIcon size={24} name={badge.icon} color={COLORS.WHITE}/>
                            </div>
                        ))}
                    </div>
                )}

                {(catalogProduct.dosage || catalogProduct.packageAmount) && (
                    <div className="c-catalog-product__properties">
                        {catalogProduct.dosage && (
                            <div className="c-catalog-product__property c-catalog-product__property--green">
                                {catalogProduct.dosage}
                            </div>
                        )}
                        {catalogProduct.packageAmount && (
                            <div className="c-catalog-product__property c-catalog-product__property--blue">
                                {catalogProduct.packageAmount}
                            </div>
                        )}
                    </div>
                )}

                <div className="c-catalog-product__name">
                    {catalogProduct.name}
                </div>
                {catalogProduct.catalogProductOffers.length === 0 && (
                    <>
                        <div className="c-catalog-product__unavailable">
                            Нет в наличии
                        </div>
                        <div className="c-catalog-product__footer">
                            <UiButton
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    Notifier.alert('Мы сообщим Вам о поступлении товара - пришлем пуш или смс');
                                }}
                                style={{
                                    padding: '0 15px'
                                }}
                                colors={{
                                    button: [COLORS.TRANSPARENT, COLORS.GREEN_PRIMARY],
                                    label: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
                                    border: [COLORS.GREEN_PRIMARY, COLORS.GREEN_PRIMARY],
                                }}
                            >
                                Сообщить о поступлении
                            </UiButton>
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
                    </>

                )}
                {catalogProduct.catalogProductOffers.length > 0 && (
                    <>
                        <div className="c-catalog-product__price">
                            <UiPrice
                                priceOffer={catalogProduct.priceOffer}
                                price={catalogProduct.price}
                            />
                        </div>
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
                                            router.push(ROUTES.CART());
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
                    </>
                )}
                {withRemind && (
                    <div className="c-catalog-product__remind" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!UserService.isAuthorized()) {
                            return;
                        }
                        store.set("isRemind", true);
                    }}>
                        <UiIcon size={24} name={"alarm"} color={COLORS.RED_PRIMARY}/>
                        <span className={'underwave'}>Напомнить заказать</span>
                    </div>
                )}
            </UiLink>
            <UiModal isOpened={store.isRemind} onClose={() => store.set('isRemind', false)}>
                <UiModal.Title value={'Напомнить заказать'}/>
                <UiModal.Description value={catalogProduct.name}/>
                <UiDatepicker
                    value={store.remindAt}
                    min={date().toISO() as string}
                    onChange={(data) => store.set("remindAt", data.value)}
                />
                <UiModal.Actions>
                    <UiButton label={'Напомнить'} onClick={handleSubmitRemind}/>
                </UiModal.Actions>
            </UiModal>
        </>
    )
})
