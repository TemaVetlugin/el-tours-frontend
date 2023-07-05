'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { lodash } from "shared/utilities";

import './index.scss';

type PropsType = {
    price: number[] | null,
    priceOffer?: number[] | null,
    quantity?: number,
}

const value = (value: number, quantity: number) => {
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

function parsePrice(price: number[]) {
    const priceMin = Math.min(...price);
    const priceMax = Math.max(...price);
    return priceMax === priceMin ? [priceMin] : [priceMin, priceMax];
}

export const UiPrice = observer((
    {
        price,
        priceOffer,
        quantity = 1,
    }: PropsType
) => {
    if (!price || price.length === 0) {
        return null;
    }
    const offer = (priceOffer && priceOffer.length > 0) ? parsePrice(priceOffer) : null;
    const current = parsePrice(price);

    const isEqual = lodash.isEqual(offer, current);

    return (
        <div className={'ui-price'}>
            {(!isEqual && offer && offer[0] > 0) && (
                <div className="ui-price__offer">
                    {offer.length === 1 && (
                        <>
                            {value(offer[0], quantity)}<span>₽</span>
                        </>
                    )}
                    {offer.length > 1 && (
                        <>
                            {value(offer[0], quantity)} - {value(offer[1], quantity)}<span>₽</span>
                        </>
                    )}
                </div>
            )}
            <div className="ui-price__current">
                {current.length === 1 && (
                    <>
                        {value(current[0], quantity)}<span>₽</span>
                    </>
                )}
                {current.length > 1 && (
                    <>
                        {value(current[0], quantity)} - {value(current[1], quantity)}<span>₽</span>
                    </>
                )}
            </div>
        </div>
    )
});

