'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CCatalog } from "shared/components/catalog";
import { LETTERS } from "shared/layout/LayoutCatalogAlphabet/letters";

import './page.scss';

type PropsType = {
    letter: string
}

export const Client = observer(({ letter: _letter }: PropsType) => {
    const letter = LETTERS[_letter];
    return (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[ROUTES.CATALOG(), ROUTES.CATALOG_NAME(_letter, letter.label)]}
                />
                <CCatalog
                    title={`Товары по алфавиту: ${letter.label}`}
                    params={{
                        startsWith: letter.query,
                    }}
                />
            </UiWrap>
        </UiPage>
    )
})
