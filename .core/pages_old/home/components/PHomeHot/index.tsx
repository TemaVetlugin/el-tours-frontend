import { observer } from "mobx-react";
import React from "react";

import { CatalogProductModel } from "shared/models";
import { UiIcon, UiLink } from "shared/uikit";
import { ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";
import { CCatalogProductsSlider } from "shared/components";

type PropsType = {
    catalogProducts: CatalogProductModel[]
}

export const PHomeHot = observer(({ catalogProducts }: PropsType) => {
    return (
        <LayoutSection
            title={(<><span>Товары дня</span> <UiIcon size={24} name={'hot'}/></>)}
            headerAside={
                <UiLink href={ROUTES.CATALOG()}>
                    Смотреть все ⟶
                </UiLink>
            }
        >
            <CCatalogProductsSlider catalogProducts={catalogProducts}/>
        </LayoutSection>
    )
});
