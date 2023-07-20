'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiGrid, UiPage, UiWrap } from "shared/ui";
import { MASKS, ROUTES } from "shared/contants";
import { usePrivatePage, useUser } from "shared/hooks";
import { mask } from "shared/utilities";
import { CProfileMenu } from "shared/components/profile";

import './page.scss';

export const Client = observer(() => {
    const isGranted = usePrivatePage();
    const user = useUser();
    return (
        <UiPage>
            <UiWrap>
                <UiDataBoundary isLoading={!isGranted}>
                    <UiPage.Breadcrumbs items={[ROUTES.PROFILE()]}/>
                    <UiPage.Header title={mask(MASKS.MOBILE_PHONE, user.phone)}/>
                    <UiGrid columns={'280px 1fr'} gap={50}>
                        <CProfileMenu/>
                    </UiGrid>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
