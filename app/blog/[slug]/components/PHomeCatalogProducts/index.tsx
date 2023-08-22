'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { CatalogProductModel } from "shared/models";
import { UiGrid, UiPage } from "shared/ui";
import { CCatalogProduct } from "shared/components/catalog";
import { useContentResource } from "shared/hooks";
import { UrlType } from "shared/types";

import './index.scss';

type PropsType = {
    title: string,
    href: UrlType,
    contentResourceCode: string,
    catalogProducts: CatalogProductModel[],
}

export const PHomeCatalogProducts = observer(({ catalogProducts, title, href, contentResourceCode }: PropsType) => {
    const contentResource = useContentResource(contentResourceCode);
    if (catalogProducts.length === 0) {
        return null;
    }
    return (
        <UiPage.Section
            title={title}
            link={(<UiPage.Link href={href}>Смотреть все</UiPage.Link>)}
        >
            <UiGrid columns={4} gap={[20, 40]} className="">
                {catalogProducts.map((catalogProduct, index) => {
                    if (contentResource) {
                        const crIndexLeft = +contentResource.value2 || 0;
                        const crSize = +contentResource.value3 || 1;
                        const crIndexRight = crIndexLeft + crSize;
                        if (crIndexLeft === index) {
                            return (
                                <div
                                    key={`cr-${contentResource.id}`}
                                    className={'p-home-catalog-products__content-resource'}
                                    style={{
                                        gridColumn: `span ${contentResource.value3 || 1}`,
                                        backgroundImage: `url(${contentResource.image1}`
                                    }}
                                >
                                </div>
                            )
                        }
                        if (crIndexLeft < index && index < crIndexRight) {
                            return null;
                        }
                    }
                    return (
                        <CCatalogProduct key={catalogProduct.id} catalogProduct={catalogProduct}/>
                    )
                })}
            </UiGrid>
        </UiPage.Section>
    )
})
