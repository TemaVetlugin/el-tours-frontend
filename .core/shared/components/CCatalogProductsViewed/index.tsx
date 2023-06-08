import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { CCatalogProductsSlider } from "shared/components";
import { CatalogModule } from "shared/modules";
import { catalogProductsRequest } from "shared/requests/api";
import { CatalogProductModel } from "shared/models";
import { useObservable } from "shared/hooks";
import { LayoutSection } from "shared/layout";

import './index.scss';

export const CCatalogProductsViewed = observer(() => {
    const store = useObservable({
        catalogProducts: [] as CatalogProductModel[]
    })
    useEffect(() => {
        (async () => {
            const keys = await CatalogModule.getViews();
            if (keys.length === 0) {
                return;
            }
            const { isSuccess, data } = await catalogProductsRequest({ id: keys });
            if (isSuccess && data) {
                store.set('catalogProducts', data.items.map(item => new CatalogProductModel(item)));
            }
        })();
    }, []);

    if (store.catalogProducts.length === 0) {
        return null;
    }

    return (
        <LayoutSection title='Вы смотрели'>
            <CCatalogProductsSlider catalogProducts={store.catalogProducts}/>
        </LayoutSection>
    )
});
