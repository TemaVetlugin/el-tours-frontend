'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPrice } from "shared/ui";
import { OrderItemModel } from "shared/models";

import './index.scss';

type PropsType = {
    orderItem: OrderItemModel
}
export const COrderItem = observer(({ orderItem }: PropsType) => {
    return (
        <div className="c-order-item">
            <div
                className="c-order-item__image"
                style={{ backgroundImage: `url(${orderItem.catalogProduct?.image})` }}
            />
            <div className="c-order-item__body">
                <div className="c-order-item__header">
                    <div className="c-order-item__name">
                        {orderItem.name}
                    </div>
                    <div className="c-order-item__quantity">
                        {orderItem.quantity} шт.
                    </div>
                </div>
            </div>
            <div className="c-order-item__price">
                <UiPrice
                    priceOffer={[orderItem.totalOffer]}
                    price={[orderItem.total]}
                />
            </div>
        </div>
    );
})
