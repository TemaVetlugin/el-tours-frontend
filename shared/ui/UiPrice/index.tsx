'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductOfferModel } from "shared/models";

import './index.scss';

type PropsType = {
    prices: number[] | null,
    quantity?: number,
}

export const UiPrice = observer((
    { prices, quantity = 1 }: PropsType
) => {
    if (!prices || prices.length === 0) {
        return null;
    }

    const priceMin = Math.min(...prices);
    const priceMax = Math.max(...prices);

    const value = (value: number) => {
        const price = value * quantity;
        const main = Math.floor(price);
        let sub: number | string = Math.round((price - main) * 100);
        sub = `${sub}`.padEnd(2, '0');
        return (
            <div className={'ui-price-value'}>
                <div className="ui-price-value__main">
                    {main}
                </div>
                <div className="ui-price-value__sub">
                    ,{sub}
                </div>
            </div>
        )
    }
    return (
        <div className={'ui-price'}>
            {priceMin === priceMax && (
                <div className="ui-price__current">
                    {value(priceMin)}<span>₽</span>
                </div>
            )}
            {priceMin !== priceMax && (
                <div className="ui-price__current">
                    {value(priceMin)} - {value(priceMax)}<span>₽</span>
                </div>
            )}
        </div>
    )
});

