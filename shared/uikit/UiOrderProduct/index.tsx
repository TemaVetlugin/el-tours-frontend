import React from "react";
import { observer } from "mobx-react";

import { CatalogProductModel } from "shared/models";

import { UiLink } from "../UiLink";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel
}

export const UiOrderProduct = observer(({ catalogProduct }: PropsType) => {
    return (
        <div className="ui-order-product">
            <div className="ui-order-product__image"
                 style={{ backgroundImage: `url('https://via.placeholder.com/118x114)` }}/>
            <div className="ui-order-product__group">
                <div className="ui-order-product__info">
                    <UiLink href="#" className="ui-order-product__name">
                        {catalogProduct.name}
                    </UiLink>
                    <div className="ui-order-product__description">
                        2 X 3 733.20 ₽
                    </div>
                </div>
                <div className="ui-order-product-price">
                    <div className="ui-order-product-price__current">от 2 820. 20 ₽</div>
                    <div className="ui-order-product-price__old">2 900 ₽</div>
                </div>
            </div>
        </div>
    )
})
