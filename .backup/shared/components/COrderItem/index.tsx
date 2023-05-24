import React from "react";
import { observer } from "mobx-react";

import { UiLink } from "shared/uikit";

import "./index.scss";
import { toCurrency } from "shared/utilities";

type PropsType = {
    name: string,
    image: string,
    href?: string,
    description?: string | React.ReactNode,
    price?: number | null
}

export const COrderItem = observer(({ name, image, href, description, price }: PropsType) => {
    return (
        <div className="c-order-item">
            <div className="c-order-item__image" style={{ backgroundImage: `url(${image})` }}/>
            <div className="c-order-item__inner">
                <div className="c-order-item__info">
                    <UiLink href={href || ''} className="c-order-item__name">
                        {name}
                    </UiLink>
                    {description && (
                        <div className="c-order-item__description">{description}</div>
                    )}
                </div>
                {price && (
                    <div className="c-order-item-prices">
                        <div className="c-order-item-prices__current">{toCurrency(price)}</div>
                    </div>
                )}
            </div>
        </div>
    )
});
