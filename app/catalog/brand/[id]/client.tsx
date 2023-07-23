'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CCatalog } from "shared/components/catalog";

import { MARKS } from "./marks";

import './page.scss';

type PropsType = {
    id: string
}

export const Client = observer(({ id }: PropsType) => {
    return (
        <UiPage className={'p-catalog'}>
            <UiWrap>
                <UiPage.Breadcrumbs
                    items={[ROUTES.CATALOG(), ROUTES.CATALOG_MARK(id, MARKS[id])]}
                />
                <CCatalog
                    title={`Каталог: ${MARKS[id]}`}
                    params={{
                        markId: [id],
                        except: ['mark']
                    }}
                />
            </UiWrap>
        </UiPage>
    )
})
