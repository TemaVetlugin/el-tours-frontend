'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { CCatalog } from "shared/components/catalog";
import { useIsBooting, useRouter } from "shared/hooks";
import { UserService } from "shared/services";

export const Client = observer(() => {
    const isBooting = useIsBooting();
    const router = useRouter();

    useEffect(() => {
        if (isBooting) {
            return;
        }
        if (!UserService.isAuthorized()) {
            router.push(ROUTES.HOME());
        }
    }, [isBooting, router]);

    return (
        <UiPage className={'p-search'}>
            <UiWrap>
                <UiDataBoundary isLoading={isBooting}>
                    <UiPage.Breadcrumbs
                        items={[
                            ROUTES.FAVORITES(),
                        ]}
                    />
                    <CCatalog
                        title={'Избранное'}
                        params={{
                            id: UserService.user.userFavorites.map(userFavorite => userFavorite.catalogProductId),
                        }}
                    />
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
