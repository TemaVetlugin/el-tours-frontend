'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProduct = observer(({ catalogProduct}: PropsType) => {
    return (
        <div className="c-catalog-product">
            {catalogProduct.name}
        </div>
    )
})
