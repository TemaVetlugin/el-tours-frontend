import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { CatalogProductModel } from "shared/models";
import { UiSlider } from "shared/uikit";
import { useCatalogProductOffers, useMedia, useObservable } from "shared/hooks";
import { CCatalogProduct } from "shared/components";

import './index.scss';
import { MEDIA_POINTS } from "shared/contants";
import classnames from "classnames";

type PropsType = {
    catalogProducts: CatalogProductModel[],
}

export const CCatalogProductsSlider = observer(({ catalogProducts }: PropsType) => {
    const store = useObservable({
        isInitialized: false,
    });

    useEffect(() => {
        store.set("isInitialized", true);
    }, [store])

    const { isLoading } = useCatalogProductOffers({
        getCatalogProductId: () => catalogProducts.map(item => item.id)
    }, (offers) => {
        catalogProducts.forEach(catalogProduct => {
            catalogProduct.update({
                catalogProductOffers: offers[catalogProduct.id] ?? []
            })
        });
    }, [catalogProducts]);

    const { value: perPage } = useMedia({
        [MEDIA_POINTS.IS_360]: 1,
        [MEDIA_POINTS.IS_768]: 2,
        [MEDIA_POINTS.IS_1024]: 3,
        [MEDIA_POINTS.IS_1366]: 4,
    });

    return (
        <div className={classnames('c-catalog-products-slider', {
            'c-catalog-products-slider--initialized': store.isInitialized,
        })}>
            <UiSlider
                autoHeight
                loop={false}
                gap={16}
                perPage={perPage}
                items={catalogProducts}
                renderItem={(catalogProduct: CatalogProductModel) => (
                    <CCatalogProduct catalogProduct={catalogProduct} isLoading={isLoading}/>
                )}
                renderNavigation={(navigation) => {
                    if (navigation.dotsCount() < 2) {
                        return null;
                    }
                    return (
                        <div className='c-catalog-products-slider-navigation'>
                            {navigation.dots('c-catalog-products-slider-navigation__dot')}
                        </div>
                    );
                }}
            />
        </div>
    )
});
