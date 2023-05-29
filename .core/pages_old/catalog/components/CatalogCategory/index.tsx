import React from "react";
import { observer } from "mobx-react";
import { NextPage } from 'next'

import { UiCardTile, UiGrid } from "shared/uikit";
import { CatalogCategoryModel } from "shared/models";
import { LayoutTitle } from "shared/layout";
import { MEDIA_POINTS } from "shared/contants";

import './index.scss';

type PropsType = {
    catalogCategory?: CatalogCategoryModel,
    catalogCategories: CatalogCategoryModel[],
}

export const CatalogCategories: NextPage<PropsType> = observer((
    { catalogCategory, catalogCategories }
) => {
    return (
        <>
            <LayoutTitle value={catalogCategory ? `Каталог: ${catalogCategory.name}` : 'Каталог'}/>
            <UiGrid media={{
                [MEDIA_POINTS.IS_360]: {columns: 1, gap: 8},
                [MEDIA_POINTS.IS_768]: {columns: 3, gap: 16},
                [MEDIA_POINTS.IS_1024]: {columns: 3, gap: 22},
                [MEDIA_POINTS.IS_1366]: {columns: 4, gap: 22},
            }}>
                {catalogCategories.map(catalogCategory => (
                    <UiCardTile
                        key={catalogCategory.slug}
                        href={`/catalog/${catalogCategory.slug}`}
                        name={catalogCategory.name}
                        image={catalogCategory.image}
                    />
                ))}
            </UiGrid>
        </>
    )
});
