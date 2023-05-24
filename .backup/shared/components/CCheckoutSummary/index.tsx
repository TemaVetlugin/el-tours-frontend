import React from "react";
import { observer } from "mobx-react";

import { OrderModule } from "shared/modules";
import { toCurrency } from "shared/utilities";

import "./index.scss";

type PropsType = {
    storeId?: number | null,
    children?: React.ReactNode,
    withQuantityCheck?: boolean
}

export const CCheckoutSummary = observer(({ storeId, children, withQuantityCheck = true }: PropsType) => {
    return (
        <div className="c-checkout-summary">
            <div className="c-checkout-summary__title">Ваш заказ</div>
            <div className="c-checkout-summary__items">
                <div className="c-checkout-summary-item">
                    <div className="c-checkout-summary-item__label">
                        Товары ({OrderModule.getCartItemsCount(storeId)})
                    </div>
                    <div className="c-checkout-summary-item__value">
                        {toCurrency(OrderModule.getCatalogProductOffersPrice(storeId, withQuantityCheck), storeId ? '' : 'от ')}
                    </div>
                </div>
                <div className="c-checkout-summary-item c-checkout-summary-item--total">
                    <div className="c-checkout-summary-item__label">Итого</div>
                    <div className="c-checkout-summary-item__value">
                        {toCurrency(OrderModule.getCatalogProductOffersPrice(storeId, withQuantityCheck), storeId ? '' : 'от ')}
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
});
