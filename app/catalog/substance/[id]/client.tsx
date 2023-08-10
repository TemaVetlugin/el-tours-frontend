'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { CCatalog } from "shared/components/catalog";
import { ROUTES } from "shared/contants";
import { useStore } from "shared/hooks";
import { SubstanceModel, SubstanceModelInterface } from "shared/models";

import { UiPage, UiWrap } from "shared/ui";

import './page.scss';

type PropsType = {
    substance: SubstanceModelInterface
}

export const Client = observer(({ substance }: PropsType) => {
    const store = useStore({
        substance: new SubstanceModel(substance)
    })
    return (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[ROUTES.CATALOG(), ROUTES.CATALOG_SUBSTANCE(store.substance.id, store.substance.name)]}
                />
                <CCatalog
                    title={`Действующее вещество: ${store.substance.name}`}
                    params={{
                        substanceId: [store.substance.id],
                        except: ['substance'],
                    }}
                />
            </UiWrap>
        </UiPage>
    )
})
