import { observer } from "mobx-react";
import React from "react";

import { CatalogCategoryModel } from "shared/models";
import { UiCardTile, UiGrid } from "shared/uikit";
import { MEDIA_POINTS, ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";

import './index.scss';
import { useMedia } from "shared/hooks";

type PropsType = {
    catalogCategories: CatalogCategoryModel[]
}

export const PHomeCatalogCategories = observer(({ catalogCategories }: PropsType) => {
    return (
        <div className='p-home-catalog-categories'>
            <UiGrid media={{
                [MEDIA_POINTS.IS_360]: {columns: 1, gap: 8},
                [MEDIA_POINTS.IS_768]: {columns: 3, gap: 16},
                [MEDIA_POINTS.IS_1024]: {columns: 3, gap: 22},
                [MEDIA_POINTS.IS_1366]: {columns: 4, gap: 22},
            }}>
                {catalogCategories.map(catalogCategory => (
                    <UiCardTile
                        key={catalogCategory.id}
                        href={ROUTES.CATALOG(catalogCategory.slug)}
                        name={catalogCategory.name}
                        image={catalogCategory.imageThumbnail}
                    />
                ))}
            </UiGrid>
        </div>

    )
});
