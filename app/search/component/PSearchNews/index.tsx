'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { CTileNews } from "shared/components/tiles";
import { ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useObservable, useRouter, useSearchParams } from "shared/hooks";
import { NewsModel, PaginationModel, TagModel } from "shared/models";
import { newsQuery, tagsQuery } from "shared/queries/main";
import { UiDataBoundary, UiGrid, UiPage, UiSelect, UiWrap } from "shared/ui";

export const PSearchNews = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useObservable({
        tags: [] as TagModel[],
        news: [] as NewsModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });

    const searchParams = useSearchParams({
        page: 1,
        query: ''
    });

    useAsyncEffect(async () => {
        const { isSuccess, data } = await tagsQuery({ has: ['news'] });
        if (isSuccess && data) {
            store.set("tags", data.items.map(item => new TagModel(item)));
        }
    }, []);

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const { isSuccess, data } = await newsQuery({
            page: searchParams.page,
            tagId: searchParams.tagId,
            cityId: city.id
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("news", data.items.map(item => new NewsModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    if (!searchParams.query) {
        return null;
    }

    return (
        <UiPage>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.NEWS()]}/>
                <UiDataBoundary isLoading={store.isLoading} withShallowLoading isShallowLoading={store.isShallowLoading}>
                    <UiGrid columns={4} gap={[20, 50]}>
                        {store.news.map(news => <CTileNews key={news.id} template={'light'} item={news}/>)}
                    </UiGrid>
                </UiDataBoundary>
                <UiPage.Pagination pagination={store.pagination}/>
            </UiWrap>
        </UiPage>
    )
});
