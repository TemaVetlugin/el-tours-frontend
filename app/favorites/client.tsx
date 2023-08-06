'use client';

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { CCatalog } from "shared/components/catalog";
import { ROUTES } from "shared/contants";
import { useIsBooting, useRouter } from "shared/hooks";
import { UserService } from "shared/services";

import { UiDataBoundary, UiPage, UiWrap } from "shared/ui";

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

    const id = UserService.user.userFavorites.map(userFavorite => userFavorite.catalogProductId)
    return (
        <UiPage className={'p-search'}>
            <UiWrap>
                <UiDataBoundary isLoading={isBooting}>
                    <UiPage.Breadcrumbs
                        items={[
                            ROUTES.FAVORITES(),
                        ]}
                    />
                    {id.length > 0 && (
                        <CCatalog
                            title={'Избранное'}
                            params={{
                                id,
                                apply: ['id']
                            }}
                        />
                    )}
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
