import { observer } from "mobx-react";
import React from "react";

import { CompilationModel } from "shared/models";
import { UiLink } from "shared/uikit";
import { ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";
import { CCatalogProductsSlider } from "shared/components";

type PropsType = {
    compilations: CompilationModel[]
}

export const PHomeCompilations = observer(({ compilations }: PropsType) => {
    return <>{compilations.map(compilation => (
        <LayoutSection
            key={compilation.id}
            title={compilation.name}
            headerAside={
                <UiLink href={ROUTES.COMPILATION(compilation.slug)}>
                    Смотреть все ⟶
                </UiLink>
            }
        >
            <CCatalogProductsSlider catalogProducts={compilation.catalogProducts}/>
        </LayoutSection>
    ))}</>;
});
