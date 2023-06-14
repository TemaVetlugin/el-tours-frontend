'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductOfferModel } from "shared/models";
import { UiPrice } from "shared/ui";

import './index.scss';

type PropsType = {
    catalogProductOffer: CatalogProductOfferModel,
}

export const PProductStore = observer((
    { catalogProductOffer }: PropsType
) => {
    return (
        <div className="p-product-store">
            <div className="p-product-store__name">{catalogProductOffer.store.name}</div>
            <div className="p-product-store__location">
                <div className="p-product-store__address">{catalogProductOffer.store.address}</div>
                <div className="p-product-store__brand">{catalogProductOffer.store.storeBrand.name}</div>
            </div>
            <div className="p-product-store__phone">
                {catalogProductOffer.store.phone}
            </div>
            <div className="p-product-store__price">
                <UiPrice prices={[catalogProductOffer.price]}/>
            </div>
        </div>
    )
})
