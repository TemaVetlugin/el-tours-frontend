'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiGrid, UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useObservable, useSearchParams } from "shared/hooks";
import { NewsModel, PaginationModel, TagModel } from "shared/models";
import { newsQuery, tagsQuery } from "shared/queries/main";
import { CTileNews } from "shared/components/tiles";

import './page.scss';
import { wait } from "shared/utilities";

export const Client = observer(() => {
    const city = useCity();
    const store = useObservable({
        tags: [] as TagModel[],
        news: [] as NewsModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const { page } = useSearchParams({ page: 1 })

    useEffect(() => {
        document.title = 'Новости';
    }, []);

    useAsyncEffect(async () => {
        const { isSuccess, data } = await tagsQuery({ has: ['news'] });
        if (isSuccess && data) {
            store.set("tags", data.items.map(item => new TagModel(item)));
        }
    }, []);

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        await wait(1000);
        const { isSuccess, data } = await newsQuery({
            page,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("news", data.items.map(item => new NewsModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [page, city]);

    return (
        <UiPage>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.NEWS()]}/>
                <UiPage.Title value={'Новости'}/>
                <UiDataBoundary isLoading={store.isLoading} isShallowLoading={store.isShallowLoading}>
                    <UiGrid columns={4} gap={20}>
                        {store.news.map(news => <CTileNews key={news.id} value={news}/>)}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiWrap>
        </UiPage>
    )
});
