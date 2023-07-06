'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiMap } from "shared/ui";
import { CCheckoutStore } from "shared/components/checkout";
import { OnChangeType } from "shared/types";
import { CheckoutItemModel, CityModel } from "shared/models";

type PropsType = {
    checkoutItems: CheckoutItemModel[],
    city: CityModel,
    onChange: OnChangeType<number>,
    value: number | null
};

export const PCheckoutStores = observer((
    {
        onChange,
        value,
        checkoutItems,
        city
    }: PropsType
) => {
    return (
        <div className="p-checkout-section">
            <div className="p-checkout-section__header">
                <div className="p-checkout-section__counter"/>
                <div className="p-checkout-section__title">Выберите аптеку</div>
            </div>
            <div className="p-checkout-section__inner p-checkout-section__inner--stores">
                <div className="p-checkout-section__stores">
                    {checkoutItems.map(checkoutItem => (
                        <CCheckoutStore
                            key={checkoutItem.id}
                            name={'storeId'}
                            value={value}
                            onChange={onChange}
                            checkoutItem={checkoutItem}
                        />
                    ))}
                </div>
                <UiMap
                    className={'p-checkout-section__map'}
                    location={city.location}
                    zoom={city.zoom}
                    render={(map) => checkoutItems.map(checkoutItem => (
                        <UiMap.Marker
                            key={checkoutItem.store.id}
                            map={map}
                            location={checkoutItem.store.location}
                        />
                    ))}
                />
            </div>
        </div>
    )
});
