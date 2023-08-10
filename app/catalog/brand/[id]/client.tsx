'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CCatalog } from "shared/components/catalog";
import { BrandModel, BrandModelInterface } from "shared/models";
import { useStore } from "shared/hooks";

import './page.scss';

type PropsType = {
    brand: BrandModelInterface
}

export const Client = observer(({ brand }: PropsType) => {
    const store = useStore({
        brand: new BrandModel(brand)
    })
    return (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[ROUTES.CATALOG(), ROUTES.CATALOG_BRAND(store.brand.id, store.brand.name)]}
                />
                <CCatalog
                    title={`Бренд: ${store.brand.name}`}
                    params={{
                        brandId: [store.brand.id],
                        except: ['brand'],
                    }}
                />
            </UiWrap>
        </UiPage>
    )
})
