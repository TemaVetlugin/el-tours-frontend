'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPrice } from "shared/ui";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    storeId?: number | null,
    total?: number[],
    items?: [string | number, string | number][]
}

export const CCartTotal = observer(({ children, items, total }: PropsType) => {
    return (
        <div className="c-cart-total">
            {total && (
                <>
                    <div className="c-cart-total__title">Итого</div>
                    <div className="c-cart-total__price">
                        <UiPrice price={total}/>
                    </div>
                </>
            )}
            {!!items && items.map((item) => {
                return (
                    <div key={`${item[0]}${item[1]}`} className="c-cart-total__fields">
                        <div className="c-cart-total-field">
                            <div className="c-cart-total-field__name">{item[0]}</div>
                            <div className="c-cart-total-field__row"/>
                            <div className="c-cart-total-field__value">
                                {item[1]}
                            </div>
                        </div>
                    </div>
                )
            })}
            {children && (
                <div className="c-cart-total__children">
                    {children}
                </div>
            )}
        </div>
    )
})
