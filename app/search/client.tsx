'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CCatalog } from "shared/components/catalog";

type PropsType = {
    query?: string
}

export const Client = observer(({ query }: PropsType) => {
    return (
        <UiPage className={'p-search'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[
                        ROUTES.SEARCH(),
                    ]}
                />
                <CCatalog
                    title={'Поиск'}
                    params={{
                        query,
                    }}
                />
            </UiWrap>
        </UiPage>
    )
});
