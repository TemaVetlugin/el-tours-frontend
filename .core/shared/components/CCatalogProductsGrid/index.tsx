import React from "react";
import { observer } from "mobx-react";

import { CatalogProductModel } from "shared/models";
import { UiGrid, UiSkeletonLoading } from "shared/uikit";
import { useCatalogProductOffers } from "shared/hooks";
import { CCatalogProduct } from "shared/components";
import { MEDIA_POINTS } from "shared/contants";

import './index.scss';

type PropsType = {
    catalogProducts: CatalogProductModel[],
    isLoading?: boolean
    columns?: number
}

export const CCatalogProductsGrid = observer(({ catalogProducts, columns = 3, isLoading = false }: PropsType) => {
    const { isLoading: isLoadingOffers } = useCatalogProductOffers({
        getCatalogProductId: () => catalogProducts.map(item => item.id)
    }, (offers) => {
        catalogProducts.forEach(catalogProduct => {
            catalogProduct.update({
                catalogProductOffers: offers[catalogProduct.id] ?? []
            })
        });
    }, [catalogProducts]);

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
                        <UiSkeletonLoading key={item} className={'c-catalog-products-grid__skeleton'}/>
                    ))}
                </>
            </UiGrid>
        );
    }

    return (
        <UiGrid gap={12}  style={{alignItems: 'stretch'}} media={{
            [MEDIA_POINTS.IS_360]: { columns: 1 },
            [MEDIA_POINTS.IS_768]: { columns: 2 },
            [MEDIA_POINTS.IS_1024]: { columns: columns === 4 ? 3 : 2 },
            [MEDIA_POINTS.IS_1440]: { columns: columns },
        }}>
            {catalogProducts.map(catalogProduct => (
                <CCatalogProduct
                    isLoading={isLoadingOffers}
                    key={catalogProduct.id}
                    catalogProduct={catalogProduct}
                />
            ))}
        </UiGrid>
    )
});
