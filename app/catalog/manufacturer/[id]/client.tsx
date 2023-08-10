'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CCatalog } from "shared/components/catalog";
import { ManufacturerModel, ManufacturerModelInterface } from "shared/models";
import { useStore } from "shared/hooks";

import './page.scss';

type PropsType = {
    manufacturer: ManufacturerModelInterface
}

export const Client = observer(({ manufacturer }: PropsType) => {
    const store = useStore({
        manufacturer: new ManufacturerModel(manufacturer)
    })
    return (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[ROUTES.CATALOG(), ROUTES.CATALOG_MANUFACTURER(store.manufacturer.id, store.manufacturer.name)]}
                />
                <CCatalog
                    title={`Производитель: ${store.manufacturer.name}`}
                    params={{
                        manufacturerId: [store.manufacturer.id],
                        except: ['manufacturer'],
                    }}
                />
            </UiWrap>
        </UiPage>
    )
})
