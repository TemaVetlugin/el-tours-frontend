'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPrice } from "shared/ui";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    storeId?: number | null,
    total?: number[],
    items?: [string | number, string | number | null][]
}

export const COrderTotal = observer(({ children, items, total }: PropsType) => {
    return (
        <div className="c-order-total">
            {total && (
                <>
                    <div className="c-order-total__title">Итого</div>
                    <div className="c-order-total__price">
                        <UiPrice price={total}/>
                    </div>
                </>
            )}
            {!!items && items.filter(item => item[1] !== null).map((item) => {
                return (
                    <div key={`${item[0]}${item[1]}`} className="c-order-total__fields">
                        <div className="c-order-total-field">
                            <div className="c-order-total-field__name">{item[0]}</div>
                            <div className="c-order-total-field__row"/>
                            <div className="c-order-total-field__value">
                                {item[1]}
                            </div>
                        </div>
                    </div>
                )
            })}
            {children && (
                <div className="c-order-total__children">
                    {children}
                </div>
            )}
        </div>
    )
})
