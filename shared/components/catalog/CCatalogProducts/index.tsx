'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";
import { UiGrid, UiSkeleton } from "shared/ui";
import { MEDIA_POINTS } from "shared/contants";

import { CCatalogProduct } from "../CCatalogProduct";

import './index.scss';

type PropsType = {
    catalogProducts: CatalogProductModel[],
    isLoading?: boolean
    columns?: number
}

export const CCatalogProducts = observer(({ catalogProducts, columns = 3, isLoading = false }: PropsType) => {

    if (isLoading) {
        return (
            <UiGrid gap={12} media={{
                [MEDIA_POINTS.IS_360]: { columns: 1 },
                [MEDIA_POINTS.IS_768]: { columns: 2 },
                [MEDIA_POINTS.IS_1024]: { columns: columns === 4 ? 3 : 2 },
                [MEDIA_POINTS.IS_1440]: { columns: columns },
            }}>
                <>
                    {Array.from(Array(12).keys()).map((item) => (
                        <UiSkeleton key={item} className={'c-catalog-products__skeleton'}/>
                    ))}
                </>
            </UiGrid>
        );
    }

    return (
        <UiGrid gap={12} style={{ alignItems: 'stretch' }} media={{
            [MEDIA_POINTS.IS_360]: { columns: 1 },
            [MEDIA_POINTS.IS_768]: { columns: 2 },
            [MEDIA_POINTS.IS_1024]: { columns: columns === 4 ? 3 : 2 },
            [MEDIA_POINTS.IS_1440]: { columns: columns },
        }}>
            {catalogProducts.map(catalogProduct => (
                <CCatalogProduct
                    key={catalogProduct.id}
                    catalogProduct={catalogProduct}
                />
            ))}
        </UiGrid>
    )
});
