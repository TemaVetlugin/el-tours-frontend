'use client'

import { observer } from "mobx-react-lite";
import React from "react";
import { COLORS } from "shared/contants";

import { CatalogProductModel } from "shared/models";
import { UserService } from "shared/services";
import { UiIcon } from "shared/ui";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
}

export const CCatalogProductFavorite = observer(({ catalogProduct }: PropsType) => {
    return (
        <div
            className="c-catalog-product-favorite"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                UserService.toggleFavorite(catalogProduct.id)
            }}
        >
            <UiIcon
                size={24}
                name={UserService.hasFavorite(catalogProduct.id) ? "heartFilled" : "heart"}
                color={COLORS.GRAY_PRIMARY}
            />
        </div>

    )
})
