'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useObservable } from "shared/hooks";
import { UiPage, UiWrap } from "shared/ui";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models";
import { CatalogService } from "shared/services";
import { ROUTES } from "shared/contants";

type PropsType = {
    catalogProduct: CatalogProductModelInterface
}
export const Client = observer(({ catalogProduct }: PropsType) => {
    const store = useObservable({
        catalogProduct: new CatalogProductModel(catalogProduct)
    });

    return (
        <UiPage className={'p-product'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs
                    items={[
                        ...CatalogService.breadcrumbs(catalogProduct.catalogCategoryId),
                        ROUTES.PRODUCT(catalogProduct.slug, catalogProduct.name)
                    ]}
                />
                <UiPage.Title value={'Каталог'}/>
                <div className="p-product__inner">
                    <div className="p-product__media">
                        <div
                            className="p-product__image"
                            style={{backgroundImage: `url(${catalogProduct.imageThumbnail})`}}
                        />
                    </div>
                    <div className="p-product__properties">
                        <div className="p-product-property">
                            <div className="p-product-property__name"></div>
                            <span></span>
                            <div className="p-product-property__value"></div>
                        </div>
                    </div>
                    <div className="p-product__commerce">

                    </div>
                </div>
                <div>{store.catalogProduct.name}</div>
            </UiPage.Wrap>
        </UiPage>
    );
});
