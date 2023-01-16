import React, { useMemo } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import { StoreModel } from "shared/models";
import { UiButton, UiIcon } from "shared/uikit";
import { OrderModule } from "shared/modules";
import { UiControlPropsType } from "shared/types";
import { toCurrency } from "shared/utilities";

import { COLORS } from "shared/contants";
import { useObservable } from "shared/hooks";

import "./index.scss";

type PropsType = UiControlPropsType<number, {
    store: StoreModel,
}>

export const PCheckoutStore = observer((
    {
        store,
        onChange = () => {
        },
        value,
        name = 'storeId'
    }: PropsType) => {

    const state = useObservable({
        isOpened: false,
    });

    const availability = useMemo(() => OrderModule.getAvailability(store.id), [store]);
    const price = useMemo(() => toCurrency(OrderModule.getCatalogProductOffersPrice(store.id)), [store]);
    const isSelected = value === store.id;

    const classNames = classnames('p-checkout-store', `p-checkout-store--${store.id}`, {
        'p-checkout-store--selected': isSelected,
    });
    return (
        <div className={classNames}>
            <div className="p-checkout-store__inner">
                <div className="p-checkout-store__name">{store.name}</div>
                <div className="p-checkout-store__brand">
                    Аптека {store.storeBrand.name}
                </div>
                <div className="p-checkout-store__description">
                    {store.worktime?.replace("\\n", "\n")}
                </div>
                <div className="p-checkout-store__footer">
                    <div>
                        <div className="p-checkout-store__price">{price}</div>
                        <div className="p-checkout-store__availability" onClick={() => state.set("isOpened", !state.isOpened)}>
                            <span>В наличии {availability.items.length} из {OrderModule.activeCartItems.length}</span>
                            <i>
                                <UiIcon
                                    key={state.isOpened ? 'arrowTop' : 'arrowBottom'}
                                    size={10}
                                    name={state.isOpened ? 'arrowTop' :'arrowBottom'}
                                    color={COLORS.WHITE}
                                />
                            </i>
                        </div>
                    </div>
                    <UiButton
                        label={isSelected ? 'ВЫБРАНА' : 'ВЫБРАТЬ'}
                        colors={isSelected ? {
                            button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                            label: [COLORS.WHITE, COLORS.WHITE]
                        } : {
                            border: [COLORS.PRIMARY, COLORS.PRIMARY],
                            button: [COLORS.WHITE, COLORS.PRIMARY],
                            label: [COLORS.PRIMARY, COLORS.WHITE]
                        }}
                        onClick={() => {
                            onChange({
                                name,
                                value: store.id,
                            });
                        }}
                    />
                </div>
            </div>
            {state.isOpened && (
                <div className="p-checkout-store__offers">
                    {availability.items.map(({ cartItem, catalogProductsOffer }) => {
                        return (
                            <div className="p-checkout-store-offer" key={cartItem.id}>
                                <div className="p-checkout-store-offer__inner">
                                    <div className="p-checkout-store-offer__name">{cartItem.catalogProduct.name}</div>
                                    <div className="p-checkout-store-offer__description">
                                        {cartItem.quantity} X {toCurrency(catalogProductsOffer.price)}
                                    </div>
                                </div>
                                <div className="p-checkout-store-offer__total">
                                    {toCurrency(cartItem.quantity * catalogProductsOffer.price)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
});
