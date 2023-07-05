'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiPage, UiWrap } from "shared/ui";
import { MASKS, ROUTES } from "shared/contants";
import { usePrivatePage, useUser } from "shared/hooks";

import './page.scss';
import { mask } from "shared/utilities";

export const Client = observer(() => {
    const isGranted = usePrivatePage();
    const user = useUser();
    return (
        <UiPage>
            <UiWrap>
                <UiDataBoundary isLoading={!isGranted}>
                    <UiPage.Breadcrumbs items={[ROUTES.PROFILE()]}/>
                    <UiPage.Title value={mask(MASKS.MOBILE_PHONE, user.phone)}/>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
