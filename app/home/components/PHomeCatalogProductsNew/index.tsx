'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";
import { UiGrid, UiPage } from "shared/ui";
import { ROUTES } from "shared/contants";

import { CCatalogProduct } from "shared/components/catalog";
import { useContentResource } from "shared/hooks";

import './index.scss';

type PropsType = {
    catalogProducts: CatalogProductModel[],
}

export const PHomeCatalogProductsNew = observer(({ catalogProducts }: PropsType) => {
    const contentResource = useContentResource('home.catalog-products-new');

    return (
        <UiPage.Section
            title={'Новинки'}
            link={(<UiPage.Link href={ROUTES.CATALOG_MARK('new')}>Смотреть все</UiPage.Link>)}
        >
            <UiGrid columns={4} gap={[20, 40]} className="">
                {catalogProducts.map((catalogProduct, index) => {
                    if (index === 2 && contentResource) {
                        return (
                            <div
                                key={catalogProduct.id}
                                className={'p-home-catalog-products-new__content-resource'}
                                style={{
                                    backgroundImage: `url(${contentResource.image1})`
                                }}
                            />
                        )
                    }
                    return (
                        <CCatalogProduct key={catalogProduct.id} catalogProduct={catalogProduct}/>
                    )
                })}
            </UiGrid>
        </UiPage.Section>
    )
})
