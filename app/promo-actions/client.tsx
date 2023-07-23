'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useObservable, useRouter, useSearchParams } from "shared/hooks";
import { PaginationModel, PromoActionModel, TagModel } from "shared/models";
import { promoActionsQuery, tagsQuery } from "shared/queries/main";
import { CTilePromoAction } from "shared/components/tiles";
import { UiDataBoundary, UiGrid, UiPage, UiSelect, UiWrap } from "shared/ui";

import './page.scss';

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useObservable({
        promoActions: [] as PromoActionModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({ page: 1, tagId: null as null | number })

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const { isSuccess, data } = await promoActionsQuery({
            page: searchParams.page,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("promoActions", data.items.map(item => new PromoActionModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.PROMO_ACTIONS()]}/>
                <UiPage.Header
                    title={'Акции'}
                />
                <UiDataBoundary isLoading={store.isLoading} withShallowLoading isShallowLoading={store.isShallowLoading}>
                    <UiGrid columns={4} gap={[20, 50]}>
                        {store.promoActions.map((promoActions, index) => {
                            return (
                                <CTilePromoAction
                                    key={promoActions.id}
                                    template={index === 0 ? 'large' : 'base'}
                                    item={promoActions}
                                />
                            )
                        })}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiWrap>
        </UiPage>
    )
});
